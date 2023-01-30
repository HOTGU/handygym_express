import passport from "passport";
import bcrypt from "bcrypt";

import User from "../models/User.js";
import sendMail from "../utils/sendMail.js";

export const home = (req, res) => {
    res.render("home", { title: "홈" });
};

export const signin = (req, res) => {
    const {
        query: { redirectUrl },
    } = req;
    res.render("signin", {
        title: "로그인",
        csrfToken: req.csrfToken(),
        redirectUrl: redirectUrl || "",
    });
};

export const signinPost = (req, res, next) => {
    const {
        query: { redirectUrl },
    } = req;
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next();
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
                    return next();
                }
                req.flash("success", `${user.nickname}님 안녕하세요`);
                return res.redirect(redirectUrl || "/");
            });
        }
    })(req, res);
};

export const signup = (req, res) => {
    const {
        query: { redirectUrl },
    } = req;
    res.render("signup", {
        title: "회원가입",
        csrfToken: req.csrfToken(),
        redirectUrl: redirectUrl || "",
    });
};

export const signupPost = async (req, res, next) => {
    const {
        body: { nickname, email, password, passwordRepeat },
        query: { redirectUrl },
    } = req;
    try {
        // return next();
        if (!nickname || !email || !password || !passwordRepeat) {
            req.flashMessage = "빈칸 없이 작성해주세요";
            req.flashType = "error";
            req.flashRedirect = "/signup";
            return next();
        }
        if (password !== passwordRepeat) {
            req.flashMessage = "비밀번호 확인이 다릅니다";
            req.flashType = "error";
            req.flashRedirect = "/signup";
            return next();
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            req.flashType = "info";
            req.flashRedirect = "/signin";
            req.flashMessage = `이메일로 가입한 유저가 있습니다`;
            if (existUser.socialId) {
                req.flashMessage = `${existUser.socialType}(으)로 로그인한 이메일입니다`;
            }
            return next();
        }
        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = new User({
            nickname,
            email,
            password: hashedPassword,
        });

        sendMail(email, user.email_verify_string, user._id);

        await user.save();

        req.flash("success", "회원가입 성공! 이메일 인증");
        if (redirectUrl) {
            return res.redirect(`/signin?redirectUrl=${redirectUrl}`);
        } else {
            return res.redirect(`/signin`);
        }
    } catch (error) {
        next();
    }
};

export const googleCallback = async (req, res, next) => {
    passport.authenticate("google", (err, user, info) => {
        console.log(err);
        if (err) {
            return next();
        }

        req.logIn(user, (err) => {
            if (err) {
                req.flashRedirect = "/signin";
                return next();
            }
            req.flash("success", `${user.nickname}님 안녕하세요`);
            return res.redirect(info.redirectUrl || "/");
        });
    })(req, res);
};

export const kakaoCallback = async (req, res, next) => {
    passport.authenticate("kakao", (err, user, info) => {
        if (err) {
            return next();
        }

        req.logIn(user, (err) => {
            if (err) {
                req.flashRedirect = "/signin";
                return next();
            }
            req.flash("success", `${user.nickname}님 안녕하세요`);
            return res.redirect(info.redirectUrl);
        });
    })(req, res);
};

export const logout = (req, res, next) => {
    req.logout(req.user, (err) => {
        if (err) {
            return next();
        }
        req.flash("success", "로그아웃 성공");
        res.redirect("/");
    });
};

export const verifyEmail = async (req, res, next) => {
    const {
        query: { key, id, redirectUrl },
    } = req;
    try {
        const findUser = await User.findById(id);
        if (findUser.email_verify_string === key) {
            findUser.email_verified = true;
            await findUser.save();
            req.flash("success", `${findUser.nickname}님의 이메일 인증 성공`);
            return res.redirect(redirectUrl || "/");
        } else {
            req.flash("error", "잘못된접근입니다");
            return res.redirect("/");
        }
    } catch (error) {
        next();
    }
};

export const resendEmail = async (req, res, next) => {
    const {
        user: { email, _id, email_verify_string },
        query: { redirectUrl },
    } = req;
    try {
        sendMail(email, email_verify_string, _id, redirectUrl);

        req.flash("success", `인증이메일을 보냈습니다 ${email}을 확인하세요`);

        return res.redirect(
            `/no-access?redirectUrl=${redirectUrl}&&disAllowedType=resendEmail`
        );
    } catch (error) {
        next();
    }
};

export const noAccess = (req, res) => {
    const {
        query: { redirectUrl, disAllowedType },
    } = req;

    const createMessage = () => {
        if (disAllowedType === "email") {
            return `이메일 인증이 안되었습니다.\n ${req?.user?.email}을 확인해주세요.\n 이메일이 없으시면 아래 재전송 버튼을 눌러주세요.`;
        }
        if (disAllowedType === "resendEmail") {
            return `인증이메일을 보냈습니다.\n ${req?.user?.email}을 확인해주세요\n 이메일이 없으시면 아래 재전송 버튼을 눌러주세요.`;
        }
    };

    const message = createMessage();

    return res.render("noAccess", {
        message,
        redirectUrl,
    });
};
