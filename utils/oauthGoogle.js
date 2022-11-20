import passport from "passport";
import passportGoogle from "passport-google-oauth2";
const GoogleStrategy = passportGoogle.Strategy;
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";

export default () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT,
                clientSecret: process.env.GOOGLE_SECRET,
                callbackURL: "http://localhost:5000/auth/google/callback",
                passReqToCallback: true,
            },
            async (req, authToken, refreshToken, profile, done) => {
                try {
                    const existUser = await User.findOne({
                        $or: [
                            { email: profile._json.email || profile.mails[0].value },
                            { socialId: profile.id },
                        ],
                    });
                    if (existUser) {
                        existUser.socialId = profile.id;
                        existUser.socialType = "구글";
                        existUser.password = undefined;
                        await existUser.save();
                        return done(null, existUser);
                    } else {
                        const newUser = new User({
                            nickname: profile._json.name || "이름없음",
                            email: profile._json.email || undefined,
                            avatarUrl: profile._json.picture || "",
                            socialId: profile.id || profile._json.sub,
                            socialType: "구글",
                        });
                        await newUser.save();
                        return done(null, newUser);
                    }
                } catch (error) {
                    return done(error);
                }
            }
        )
    );
};
