import passport from "passport";
import passportKakao from "passport-kakao";
const KakaoStrategy = passportKakao.Strategy;
import dotenv from "dotenv";
dotenv.config();

import User from "../models/User.js";

export default () => {
    passport.use(
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_CLIENT,
                callbackURL: "http://localhost:5000/auth/kakao/callback",
                passReqToCallback: true,
            },
            async (req, authToken, refreshToken, profile, done) => {
                try {
                    const existUser = await User.findOne({
                        $or: [
                            {
                                email: profile._json.kakao_account.email,
                            },
                            { socialId: profile.id },
                        ],
                    });
                    if (existUser) {
                        existUser.socialId = profile.id;
                        existUser.socialType = "카카오";
                        existUser.password = undefined;
                        await existUser.save();
                        return done(null, existUser);
                    } else {
                        const newUser = new User({
                            nickname:
                                profile.username || profile._json.properties.nickname,
                            email: profile._json.kakao_account.email || undefined,
                            avatarUrl: profile._json.properties.thumbnail_image || "",
                            socialId: profile.id || profile._json.id,
                            socialType: "카카오",
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
