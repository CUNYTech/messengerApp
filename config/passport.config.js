const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../server/models/user');

module.exports = (passport) => {
  // Local Strategy
  passport.use(new LocalStrategy({
    // change credentials (by default, LocalStrategy expects username and password)
    usernameField: 'email',
    passwordField: 'password',
    session: true,
  }, (email, password, done) => {
    // match email
    User.findOne({ email }, (err, user) => {
      if (err) return done(err);
      if (!user) { return done(null, false, { error: 'User not found.' }); }

      // match password
      bcrypt.compare(password, user.password, (error, isMatch) => {
        if (error) return done(error);
        if (isMatch) { return done(null, user); }
        return done(null, false, { error: 'Incorrect password' });
      });
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // passport.deserializeUser((user, done) => {
  //   done(null, user);
  // });
};
