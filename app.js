const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const routes = require('./routes.js');
require('dotenv').config();
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new FacebookStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.SECRET,
  callbackURL: process.env.CALLBACK_URL
}, function (accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
));

app.use('/', routes);


const port = 3000;

app.listen(port, () => {
  console.log('App listening on port ' + port);
});
