import passport from "passport";
import User from "../models/User.js";

export const home = (req, res) => {
    res.render("home");
};

export const signin = (req, res) => {
    res.render("signin");
};

export const signinPost = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/signup",
});

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
            console.log("비밀번호가 틀립니다!!");
            return res.status(500);
        }
        const user = new User({
            nickname,
            email,
        });

        await User.register(user, password);

        res.redirect("/signin");
    } catch (error) {
        console.log(error);
    }
};

export const logout = (req, res) => {
    req.logout(req.user, (err) => {
        if (err) {
            //flash 처리
            return res.status(500);
        }
        res.redirect("/");
    });
};
