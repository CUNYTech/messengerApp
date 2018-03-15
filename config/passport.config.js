const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../server/models/user');
const config = require('./db.config');

module.exports = (passport) => {
  // Local Strategy
  passport.use(new LocalStrategy({
    // change credentials (by default, LocalStrategy expects username and password)
    usernameField: 'email',
    passwordField: 'password',
    session: false
  }, (email, password, done) => {
    // match email
    User.findOne({ email: email }, (err, user) => {
      if (err) return done(err);
      if (!user) 
        return done(null, false, { message: 'User not found.' });

      // match password
      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) return done(error);
        if (isMatch) 
          return done(null, user);
        else
          return done(null, false, { message: 'Incorrect password' });
      });
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(null, user);
    });
  });
}
