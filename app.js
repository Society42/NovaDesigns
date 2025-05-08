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
    const totalSwat = await Swat.countDocuments();
    const totalIA = await IA.countDocuments();
  
    res.render('home', {
      user: req.user,
      stats: {
        totalUsers,
        totalSwat,
        totalIA,
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
    const currentMember = await User.findOne({ discordId: req.user.discordId });

    if (!currentMember) {
      return res.status(403).send('Access denied: Not a Silver Command+');
    }

    const userRole = currentMember.tier;

    const allowedRanks = [
      'Chief Officer Team',
      'Gold Command',
      'Silver Command',
    ];

    if (!allowedRanks.includes(userRole)) {
      return res.status(403).send('Access denied');
    }

    const users = await User.find();

    const rankHierarchy = {
      'Bot Overseer': 1,
      'Officer': 2,
      'Officer First Class': 3,
      'Officer Second Class': 4,
      'Senior Officer': 5,
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

    res.render('admin_users', { users, user: req.user});
  } catch (err) {
    console.error("Error fetching SWAT members: ", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/admin/users/edit/:id', requireGoldOrSilverCommand, async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
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

const Swat = require('./models/Swat'); 
const internalaffairs = require('./models/InternalAffairs'); 

app.get('/admin/internal-affairs', async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');

  try {
    const currentMember = await User.findOne({ discordId: req.user.discordId });

    if (!currentMember) {
      return res.status(403).send('Access denied: Not a Silver Command+');
    }

    const userRole = currentMember.tier;

    const allowedRanks = [
      'Chief Officer Team',
      'Gold Command',
      'Silver Command',
    ];

    if (!allowedRanks.includes(userRole)) {
      return res.status(403).send('Access denied');
    }

    const ia = await internalaffairs.find();

    const rankHierarchy = {
      'Bot Overseer': 1,
      'IA-Trial Agent': 2,
      'IA Agent': 3,
      'IA Supervisor': 4,
      'IA Assistant Director': 5,
      'IA Director': 6,
      'Assistant Chief Of Police': 7,
      'Deputy Chief Of Police': 8,
      'Chief Of Police': 9
    };

    ia.sort((a, b) => {
      const rankA = rankHierarchy[a.rank] || 0;
      const rankB = rankHierarchy[b.rank] || 0;
      return rankB - rankA;
    });

    res.render('admin_internal-affairs', { ia, user: req.user || null });
  } catch (err) {
    console.error("Error fetching SWAT members: ", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post('/admin/internal-affairs/edit/:id', requireGoldOrSilverCommand, async (req, res) => {
  try {
    const iaEntry = await internalaffairs.findById(req.params.id);

    if (!iaEntry) {
      return res.status(404).send("Internal Affair not found");
    }

    iaEntry.Username = req.body.Username || iaEntry.Username;
    iaEntry.rank = req.body.rank || iaEntry.rank;
    iaEntry.status = req.body.status || iaEntry.status;
    iaEntry.steamId = req.body.steamId || iaEntry.steamId;
    iaEntry.strikes = req.body.strikes || iaEntry.strikes;
    iaEntry.division = req.body.division || iaEntry.division;

    await iaEntry.save(); 
    res.redirect('/admin/internal-affairs');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating internal affair");
  }
});

app.post('/admin/internal-affairs/delete/:id', async (req, res) => {
  try {
    await internalaffairs.findByIdAndDelete(req.params.id);
    res.redirect('/admin/internal-affairs');
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting internal affair");
  }
});

app.post('/admin/internal-affairs/create', (req, res) => {
  const { Username, discordId, rank, status, steamId, strikes, division } = req.body;

  const newIA = new internalaffairs({
    Username,
    discordId,
    rank,
    status,
    steamId,
    strikes,
    division
  });

  newIA.save()
    .then(() => {
      res.redirect('/admin/internal-affairs');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error creating internal affair");
    });
});

app.get('/swat', async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  
  try {
    const swatMembers = await Swat.find(); 

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

    swatMembers.sort((a, b) => {
      const rankA = rankHierarchy[a.rank] || 0; 
      const rankB = rankHierarchy[b.rank] || 0; 
      return rankB - rankA;
    });

    res.render('swat', { swatMembers, user: req.user });
  } catch (err) {
    console.error("Error fetching officer data: ", err);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/admin/swat', async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');

  try {
    const currentMember = await Swat.findOne({ discordId: req.user.discordId });

    if (!currentMember) {
      return res.status(403).send('Access denied: Not a SWAT member');
    }

    const swatRole = currentMember.rank;

    const allowedRanks = [
      'Chief Of Police',
      'Deputy Chief Of Police',
      'Assistant Chief Of Police',
      'Commander',
      'Captain',
      'Major',
      'Lieutenant',
      'SWAT Commander',
      'Bot Overseer'
    ];

    if (!allowedRanks.includes(swatRole)) {
      return res.status(403).send('Access denied');
    }

    const swatMembers = await Swat.find();

    const rankHierarchy = {
      'Bot Overseer': 1,
      'Officer': 2,
      'Officer First Class': 3,
      'Officer Second Class': 4,
      'Senior Officer': 5,
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

    swatMembers.sort((a, b) => {
      const rankA = rankHierarchy[a.rank] || 0;
      const rankB = rankHierarchy[b.rank] || 0;
      return rankB - rankA;
    });

    res.render('admin_swat', { swatMembers, user: req.user });
  } catch (err) {
    console.error("Error fetching SWAT members: ", err);
    res.status(500).send("Internal Server Error");
  }
});


app.post('/admin/swat/edit/:id', requireGoldOrSilverCommand, async (req, res) => {
  await Swat.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/admin/swat');
});

app.post('/admin/swat/create', (req, res) => {
  const { Username, discordId, rank, status, steamId, strikes, division } = req.body;

  const newSwat = new Swat({
    Username,
    discordId,
    rank,
    status,
    steamId,
    strikes,
    division
  });

  newSwat.save()
    .then(() => {
      res.redirect('/admin/swat');  
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error creating user");
    });
});

const IA = require('./models/InternalAffairs'); 

app.get('/Internal-Affairs', async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/');
  
  try {
    const InternalAffairs = await IA.find(); 

    const rankHierarchy = {
      'IA-Trial Agent': 1,
      'IA Agent': 2,
      'IA Supervisor': 3,
      'IA Assistant Director': 4,
      'IA Director': 5,
      'Assistant Chief Of Police': 6,
      'Deputy Chief Of Police': 7,
      'Chief Of Police': 8
    };

    InternalAffairs.sort((a, b) => {
      const rankA = rankHierarchy[a.rank] || 0; 
      const rankB = rankHierarchy[b.rank] || 0; 
      return rankB - rankA;
    });

    res.render('Internal-Affairs', { InternalAffairs, user: req.user });
  } catch (err) {
    console.error("Error fetching officer data: ", err);
    res.status(500).send("Internal Server Error");
  }
});

const Guide = require('./models/Guide'); 

app.get('/admin/guides', async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/login');

  try {
    const currentUser = await User.findOne({ discordId: req.user.discordId });
    if (currentUser && (currentUser.tier === 'Gold Command' || currentUser.tier === 'Silver Command')) {
      const guides = await Guide.find();
      res.render('admin_guides', { guides });
    } else {
      return res.status(403).send('Access Denied');
    }
  } catch (err) {
    console.error('Error fetching guides:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/admin/guides/create', async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/login');

  const currentUser = await User.findOne({ discordId: req.user.discordId });
  if (currentUser && (currentUser.tier === 'Gold Command' || currentUser.tier === 'Silver Command')) {
    res.render('create_guide');
  } else {
    return res.status(403).send('Access Denied');
  }
});

app.post('/admin/guides/create', async (req, res) => {
  const { title, content, isPublic } = req.body;
  const currentUser = await User.findOne({ discordId: req.user.discordId });

  if (!title || !content) {
    return res.status(400).send('Title and content are required.');
  }

  const newGuide = new Guide({
    title,
    content,
    isPublic: isPublic === 'on', 
    createdBy: currentUser._id,
  });

  try {
    await newGuide.save();
    res.redirect('/admin/guides');
  } catch (err) {
    console.error('Error saving guide:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/guides/:id', async (req, res) => {
  const guideId = req.params.id;
  try {
    const guide = await Guide.findById(guideId);
    if (guide) {
      if (guide.isPublic || req.isAuthenticated()) {
        res.render('guide_detail', { guide });
      } else {
        res.status(403).send('Access Denied: This guide is private.');
      }
    } else {
      res.status(404).send('Guide not found.');
    }
  } catch (err) {
    console.error('Error fetching guide:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/guides', async (req, res) => {
  try {
    const guides = await Guide.find();

    const accessibleGuides = guides.filter(guide => guide.isPublic || req.isAuthenticated());

    res.render('guides', { guides: accessibleGuides, isAuthenticated: req.isAuthenticated() });
  } catch (err) {
    console.error('Error fetching guides:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/guides/:id', async (req, res) => {
  const guideId = req.params.id;
  try {
    const guide = await Guide.findById(guideId);
    if (guide) {
      if (guide.isPublic || req.isAuthenticated()) {
        res.render('guide_detail', { guide });
      } else {
        res.status(403).send('Access Denied: This guide is private.');
      }
    } else {
      res.status(404).send('Guide not found.');
    }
  } catch (err) {
    console.error('Error fetching guide:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
