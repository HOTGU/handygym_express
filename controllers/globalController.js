import passport from "passport";
import bcrypt from "bcrypt";

import User from "../models/User.js";

export const home = (req, res) => {
    res.render("home");
};

export const signin = (req, res) => {
    res.render("signin");
};

export const signinPost = (req, res) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            req.flash("error", "로그인 오류 발생");
            return res.redirect("/signup");
        }

        if (!user) {
            req.flash("error", info.message);
            if (info.message === "이메일로 가입된 유저가 없습니다") {
                return res.redirect("/signup");
            }

            return res.redirect("/signin");
        } else {
            req.logIn(user, (err) => {
                if (err) {
                    req.flash("error", "로그인 오류 발생");
                    return res.redirect("/signin");
                }
                req.flash("success", `${user.nickname}님 안녕하세요👋`);
                return res.redirect("/");
            });
        }
    })(req, res);
};

export const signup = (req, res) => {
    res.render("signup");
};

export const signupPost = async (req, res) => {
    const {
        body: { nickname, email, password, passwordRepeat },
    } = req;
    try {
        if (password !== passwordRepeat) {
            // flash 처리
            return res.status(500);
        }
        const existUser = await User.findOne({ email });
        if (existUser) {
            if (existUser.socialId) {
                req.flash("info", `${existUser.socialType}(으)로 로그인한 이메일입니다`);
            }
            return res.redirect("/signin");
        }
        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = new User({
            nickname,
            email,
            password: hashedPassword,
            avatarUrl: "",
            googleId: null,
            kakaoId: null,
        });

        await user.save();

        // await User.register(user, password);

        return res.redirect("/signin");
    } catch (error) {
        console.log(error);
        if (error.message === "A user with the given username is already registered") {
            console.log("유저가 있음");
        }
    }
};

export const logout = (req, res) => {
    req.logout(req.user, (err) => {
        if (err) {
            //flash 처리
            return res.status(500);
        }
        req.flash("success", "로그아웃 성공");
        res.redirect("/");
    });
};
