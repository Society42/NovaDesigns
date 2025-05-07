require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const DiscordStrategy = require('passport-discord').Strategy;
const User = require('./models/User');
const CadetList = require('./models/CadetList');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();

const app = express();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB Connected');
}).catch(console.error);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_CALLBACK_URL,
    scope: ['identify']
  }, async (accessToken, refreshToken, profile, cb) => {
    try {
      const whitelisted = await User.findOne({ discordId: profile.id });
      
      let avatarURL = null;
      if (profile.avatar) {
        const avatarType = profile.avatar.startsWith('a_') ? 'gif' : 'png';
        avatarURL = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${avatarType}?size=1024`; 
      }
  
      if (!whitelisted) {
        return cb(null, false, { message: 'Access Denied' });
      }
  
      await User.findOneAndUpdate(
        { discordId: profile.id },
        {
          avatarURL,
          Username: profile.username
        },
        { upsert: true, new: true }
      );      
      
      return cb(null, profile);
    } catch (err) {
      return cb(err, null);
    }
  }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ discordId: id });
      done(null, user);
    } catch (err) {
      done(err, null);
    }
});

function requireGoldOrSilverCommand(req, res, next) {
  const userRoles = req.user?.tier || [];
  if (userRoles.includes('Gold Command') || userRoles.includes('Silver Command')) {
    return next();
  }
  return res.status(403).send('Access denied.');
}

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('login', { user: req.user });
});

app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/access-denied'
  }), (req, res) => {
    res.redirect('/home');
  });

app.get('/home', async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'Active' });
    const totalDivisions = await User.distinct('division');
  
    res.render('home', {
      user: req.user,
      stats: {
        totalUsers,
        activeUsers,
        totalDivisions: totalDivisions.length
      }
    });
  } catch (err) {
    console.error('Error fetching statistics:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.get('/access-denied', (req, res) => {
  res.render('access-denied');
});

app.get('/officers', async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  
  try {
    const officers = await User.find(); 

    const rankHierarchy = {
      'Officer': 1,
      'Officer First Class': 2,
      'Officer Second Class': 3,
      'Senior Officer': 4,
      'Corporal': 6,
      'Lance Corporal': 7,
      'Senior Corporal': 8,
      'SWAT Officer': 9,
      'SWAT Corporal': 10,
      'SWAT Sergeant': 11,
      'SWAT Lieutenant': 12,
      'SWAT Captain': 13,
      'SWAT Commander': 14,
      'Sergeant': 15,
      'Staff Sergeant': 16,
      'Master Sergeant': 17,
      'Lieutenant': 18,
      'Major': 19,
      'Captain': 20,
      'Commander': 21,
      'Assistant Chief Of Police': 22,
      'Deputy Chief Of Police': 23,
      'Chief Of Police': 24
    };

    officers.sort((a, b) => {
      const rankA = rankHierarchy[a.rank] || 0; 
      const rankB = rankHierarchy[b.rank] || 0; 
      return rankB - rankA;
    });

    res.render('officers', { officers, user: req.user });
  } catch (err) {
    console.error("Error fetching officer data: ", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/profile', async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  
  try {
    const cadetList = await CadetList.findOne({ discordId: req.user.discordId });

    res.render('profile', {
      user: req.user,
      cadetList: cadetList || {}
    });
  } catch (err) {
    console.error('Error fetching cadet list:', err);
    res.status(500).send('Internal Server Error');
  }
});

const adminCadetsRoute = async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  
  const userRole = req.user.tier;

  if (userRole !== 'Gold Command' && userRole !== 'Silver Command' && userRole !== 'Chief Officer Team') {
    return res.status(403).send('Access denied');
  }

  try {
    const cadets = await CadetList.find();

    const cadetsWithUsernames = await Promise.all(
      cadets.map(async cadet => {
        const user = await User.findOne({ discordId: cadet.discordId });
        const username = user ? user.Username : 'Unknown';

        return {
          ...cadet.toObject(),
          Username: username
        };
      })
    );

    res.render('admin_cadets', { user: req.user, cadets: cadetsWithUsernames });
    
  } catch (err) {
    console.error('Error fetching cadet data:', err);
    res.status(500).send('Internal Server Error');
  }
};

app.get('/admin/cadets', requireGoldOrSilverCommand, adminCadetsRoute);

app.post('/admin/cadets/update/:id', async (req, res) => { 
  if (!req.isAuthenticated()) return res.redirect('/');

  try {
    const cadetId = req.params.id; 
    const { arrests, rideAlongs, warrants, fines, heists } = req.body;

    const cadet = await CadetList.findById(cadetId);

    if (!cadet) {
      return res.status(404).send('Cadet not found');
    }

    if (arrests !== undefined) cadet.arrests = arrests;
    if (rideAlongs !== undefined) cadet.rideAlongs = rideAlongs;
    if (warrants !== undefined) cadet.warrants = warrants;
    if (fines !== undefined) cadet.fines = fines;
    if (heists !== undefined) cadet.heists = heists;

    await cadet.save();

    res.redirect('/admin/cadets');
  } catch (err) {
    console.error('Error updating cadet:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/admin', async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  
  try {
    res.render('admin', { user: req.user });
  } catch (err) {
    console.error("Error fetching officer data: ", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/admin/users', async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');

  try {
    const users = await User.find({});

    const rankHierarchy = {
      'Officer': 1,
      'Officer First Class': 2,
      'Officer Second Class': 3,
      'Senior Officer': 4,
      'Corporal': 6,
      'Lance Corporal': 7,
      'Senior Corporal': 8,
      'SWAT Officer': 9,
      'SWAT Corporal': 10,
      'SWAT Sergeant': 11,
      'SWAT Lieutenant': 12,
      'SWAT Captain': 13,
      'SWAT Commander': 14,
      'Sergeant': 15,
      'Staff Sergeant': 16,
      'Master Sergeant': 17,
      'Lieutenant': 18,
      'Major': 19,
      'Captain': 20,
      'Commander': 21,
      'Assistant Chief Of Police': 22,
      'Deputy Chief Of Police': 23,
      'Chief Of Police': 24
    };

    users.sort((a, b) => {
      const rankA = rankHierarchy[a.rank] || 0; 
      const rankB = rankHierarchy[b.rank] || 0; 
      return rankB - rankA;
    });

    res.render('admin_users', { users, user: req.user });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/admin/users/edit/:id', async (req, res) => {
  const { Username, discordId, tier } = req.body;
  await User.findByIdAndUpdate(req.params.id, { Username, discordId, tier });
  res.redirect('/admin/users');
});

app.post('/admin/users/delete/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.redirect('/admin/users');
});

app.post('/admin/users/create', (req, res) => {
  const { Username, discordId, rank, status, steamId, strikes, division, tier } = req.body;

  const newUser = new User({
    Username,
    discordId,
    rank,
    status,
    steamId,
    strikes,
    division,
    tier
  });

  newUser.save()
    .then(() => {
      res.redirect('/admin/users');  
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error creating user");
    });
});

const documents = [
  { title: 'Employee Handbook', description: 'A comprehensive overview of FBI policies and procedures.', fileName: 'handbook', creditor: 'ryder_is_short (Michelle Harrison)' },
  { title: 'Training Guide', description: 'Contains guidelines and information on FBI training programs and standards.', fileName: 'training-guide', creditor: 'ryder_is_short (Michelle Harrison)' },
  { title: 'Roster', description: 'A complete list of all active FBI agents and their roles across departments.', fileName: 'roster', creditor: 'society_yt (Jack Stone)' },
];

app.get('/documents', (req, res) => {
  res.render('documents', { documents });
});

app.get('/documents/:documentName', (req, res) => {
  const { documentName } = req.params;
  const document = documents.find(doc => doc.fileName === documentName);
  if (document) {
    res.render('document-view', { document });
  } else {
    res.status(404).send('Document not found');
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
