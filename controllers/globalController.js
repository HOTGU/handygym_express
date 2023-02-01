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

export const signinPost = (req, res) => {
    const {
        query: { redirectUrl },
    } = req;
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            req.flash("error", "서버 오류가 발생했습니다\n불편함을 드려 죄송합니다");
            return res.redirect("/signin");
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
                    req.flash(
                        "error",
                        "서버 오류가 발생했습니다\n불편함을 드려 죄송합니다"
                    );
                    return res.redirect("/signin");
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

export const signupPost = async (req, res) => {
    const {
        body: { nickname, email, password, passwordRepeat },
        query: { redirectUrl },
    } = req;
    try {
        if (!nickname || !email || !password || !passwordRepeat) {
            req.flash("error", "빈칸 없이 작성해주세요");
            return res.redirect("/signup");
        }
        if (password !== passwordRepeat) {
            req.flash("error", "비밀번호 확인이 다릅니다");
            return res.redirect("/signup");
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            if (existUser.socialId) {
                req.flash("info", `${existUser.socialType}(으)로 로그인한 이메일입니다`);
                return res.redirect("/signin");
            }
            req.flash("info", "이메일로 가입한 유저가 있습니다");
            return res.redirect("/signin");
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
        req.flash("error", "서버 오류가 발생했습니다\n불편함을 드려 죄송합니다");
        return res.redirect("/signup");
    }
};

export const googleCallback = async (req, res) => {
    passport.authenticate("google", (err, user, info) => {
        if (err) {
            req.flash("error", "서버 오류가 발생했습니다\n불편함을 드려 죄송합니다");
            return res.redirect("/signin");
        }

        req.logIn(user, (err) => {
            if (err) {
                req.flash("error", "서버 오류가 발생했습니다\n불편함을 드려 죄송합니다");
                return res.redirect("/signin");
            }
            req.flash("success", `${user.nickname}님 안녕하세요`);
            return res.redirect(info.redirectUrl || "/");
        });
    })(req, res);
};

export const kakaoCallback = async (req, res) => {
    passport.authenticate("kakao", (err, user, info) => {
        if (err) {
            console.log(err);
            req.flash("error", "서버 오류가 발생했습니다\n불편함을 드려 죄송합니다");
            return res.redirect("/signin");
        }

        req.logIn(user, (err) => {
            if (err) {
                req.flash("error", "서버 오류가 발생했습니다\n불편함을 드려 죄송합니다");
                return res.redirect("/signin");
            }
            req.flash("success", `${user.nickname}님 안녕하세요`);
            return res.redirect(info.redirectUrl);
        });
    })(req, res);
};

export const logout = (req, res) => {
    req.logout(req.user, (err) => {
        if (err) {
            req.flash("error", "서버 오류가 발생했습니다\n불편함을 드려 죄송합니다");
            return res.redirect("/");
        }
        req.flash("success", "로그아웃 성공");
        res.redirect("/");
    });
};

export const verifyEmail = async (req, res) => {
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
        req.flash("error", "서버 오류가 발생했습니다\n불편함을 드려 죄송합니다");
        return res.redirect("/");
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
        req.flash("error", "서버 오류가 발생했습니다\n불편함을 드려 죄송합니다");
        return res.redirect("/");
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
