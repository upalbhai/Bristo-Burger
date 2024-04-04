const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User")
const passport = require('passport');


const connectPassport = () => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    }, async function(accessToken, refreshToken, profile, done) {
        // database comes here
        const user = await User.findOne({
            googleId: profile.id,
            name: profile.displayName,
        });
        if (!user) {
            const newUser = await User.create({
                googleId: profile.id,
                name: profile.displayName,
                photo: profile.photos[0].value,
            });
            return done(null, newUser);
        } else {
            return done(null, user);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
   
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });
};

module.exports = {
    connectPassport
};
