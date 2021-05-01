const GoogleStrategy = require("passport-google-oauth2").Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const svr = "http://" + process.env.HOST + ":" + process.env.PORT;

module.exports = (app, passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${svr}/auth/auth/google/callback`,
        passReqToCallback: true,
      },
      // function (request, accessToken, refreshToken, profile, done) {
      //   return done(null, profile);
      // }
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          // Could get accessed in two ways:
          // 1) When registering for the first time
          // 2) When linking account to the existing one

          // Should have full user profile over here
          console.log("profile", profile);
          console.log("accessToken", accessToken);
          console.log("refreshToken", refreshToken);

          if (req.user) {
            // We're already logged in, time for linking account!
            // Add Google's data to an existing account
            req.user.methods.push("google");
            req.user.google = {
              id: profile.id,
              email: profile.emails[0].value,
            };
            await req.user.save();
            return done(null, req.user);
          } else {
            // We're in the account creation process
            let existingUser = await User.findOne({ "google.id": profile.id });
            if (existingUser) {
              return done(null, existingUser);
            }

            // Check if we have someone with the same email
            existingUser = await User.findOne({
              "local.email": profile.emails[0].value,
            });
            if (existingUser) {
              // We want to merge google's data with local auth
              existingUser.methods.push("google");
              existingUser.google = {
                id: profile.id,
                email: profile.emails[0].value,
              };
              await existingUser.save();
              return done(null, existingUser);
            }

            const newUser = new User({
              methods: ["google"],
              google: {
                id: profile.id,
                email: profile.emails[0].value,
              },
            });

            await newUser.save();
            done(null, newUser);
          }
        } catch (error) {
          done(error, false, error.message);
        }
      }
    )
  );

  // passport.serializeUser(function (user, done) {
  //   done(null, user);
  // });

  // passport.deserializeUser(function (user, done) {
  //   done(null, user);
  // });
};
