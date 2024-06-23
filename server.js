const express = require('express');
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const { Server } = require('socket.io');
const http = require('http');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const AdmZip = require('adm-zip');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;
const CLIENT_ID = '1093880651956113508';
const CLIENT_SECRET = 'pfdr3sLEdeTZZF28b3IhDBtn9r2awcZq';
const CALLBACK_URL = 'http://localhost:3000/auth/discord/callback';
const ALLOWED_USERS = ['1040357402647724082', 'USER_ID_2'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
passport.use(new DiscordStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: CALLBACK_URL,
  scope: ['identify']
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => done(null, profile));
}));

app.use(session({
  secret: 'some random secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  if (req.isAuthenticated() && ALLOWED_USERS.includes(req.user.id)) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  }
});

app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/user', (req, res) => {
  res.json(req.user || {});
});

app.post('/upload', upload.array('files'), (req, res) => {
  res.sendStatus(200);
});

app.post('/upload-zip', upload.single('zipFile'), (req, res) => {
  const zipFile = req.file;
  if (!zipFile) {
    return res.sendStatus(400);
  }

  const zip = new AdmZip(zipFile.path);
  zip.extractAllTo('uploads/', true); 
  fs.unlinkSync(zipFile.path); 

  res.sendStatus(200);
});

app.get('/files', (req, res) => {
  fs.readdir('uploads', { withFileTypes: true }, (err, files) => {
    if (err) {
      res.status(500).send('Unable to scan files!');
    } else {
      const fileList = files.map(file => ({
        name: file.name,
        isDirectory: file.isDirectory(),
      }));
      res.json(fileList);
    }
  });
});

app.get('/files/:name', (req, res) => {
    const fileName = req.params.name;
    let filePath;

  if (fileName.includes('/')) {
    const [directory, file] = fileName.split('/');
    filePath = path.join(__dirname, 'uploads', directory, file);
  } else {
    filePath = path.join(__dirname, 'uploads', fileName);
  }

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error serving file:', err);
      res.status(404).send('File not found!');
    }
  });
});

app.post('/save', (req, res) => {
  const { fileName, content } = req.body;
  const filePath = path.join(__dirname, 'uploads', fileName);
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      res.status(500).send('Error saving file!');
    } else {
      res.sendStatus(200);
    }
  });
});

io.on('connection', (socket) => {
  socket.on('code update', (data) => {
    io.emit('code update', data);
  });

  socket.on('file list update', () => {
    fs.readdir('uploads', { withFileTypes: true }, (err, files) => {
      if (!err) {
        const fileList = files.map(file => ({
          name: file.name,
          isDirectory: file.isDirectory(),
        }));
        io.emit('file list', fileList);
      }
    });
  });

  socket.on('get directory', (dirName) => {
    const dirPath = path.join(__dirname, 'uploads', dirName);
    fs.readdir(dirPath, { withFileTypes: true }, (err, items) => {
      if (err) {
        socket.emit('directory error', err.message);
      } else {
        const files = [];
        const directories = [];
        items.forEach(item => {
          if (item.isDirectory()) {
            directories.push(item.name);
          } else {
            files.push(item.name);
          }
        });
        socket.emit('directory', { files, directories });
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
