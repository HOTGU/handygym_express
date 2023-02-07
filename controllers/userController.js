import Gallery from "../models/Gallery.js";
import Gym from "../models/Gym.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const detail = async (req, res) => {
    const {
        params: { userId },
    } = req;
    try {
        const findUser = await User.findById(userId);
        const gyms = await Gym.find({ creator: userId });
        const posts = await Post.find({ creator: userId });
        const galleries = await Gallery.find({ creator: userId });

        return res.render("userDetail", {
            title: `${findUser.nickname} 상세`,
            findUser,
            gyms,
            posts,
            galleries,
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        req.flash("서버 오류가 발생했습니다\n 불편함을 드려 죄송합니다");
        return res.redirect("/");
    }
};

export const update = (req, res) => {
    res.render("userUpdate", {
        title: "내정보수정",
        csrfToken: req.csrfToken(),
        user: req.user,
    });
};

export const updatePost = async (req, res) => {
    const { body, file, user } = req;

    try {
        await User.findByIdAndUpdate(
            user._id,
            {
                ...body,
                avatarUrl: file ? file.location : "",
            },
            {
                new: true,
            }
        );

        return res.redirect(`/user/${user._id}`);
    } catch (error) {
        req.flash("서버 오류가 발생했습니다\n 불편함을 드려 죄송합니다");
        return res.redirect("/");
    }
};
