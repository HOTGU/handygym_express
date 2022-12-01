import Post from "../models/Post.js";

export const fetch = async (req, res) => {
    try {
        const posts = await Post.find({}).populate("creator");

        return res.render("post", { title: "게시판", posts });
    } catch (error) {
        console.log(error);
    }
};

export const upload = (req, res) => {
    return res.render("postUpload", { title: "게시판 등록", csrfToken: req.csrfToken() });
};

export const uploadPost = async (req, res) => {
    const { body, user } = req;
    try {
        const newPost = new Post({
            ...body,
            creator: user,
        });

        await newPost.save();
        return res.redirect("/post");
    } catch (error) {
        console.log(error);
    }
};

export const detail = async (req, res) => {
    const {
        params: { postId },
    } = req;
    try {
        const post = await Post.findById(postId).populate("creator");

        return res.render("postDetail", { title: `${post.title}`, post });
    } catch (error) {
        console.log(error);
    }
};

export const update = async (req, res) => {
    const {
        params: { postId },
        user,
    } = req;
    try {
        const post = await Post.findById(postId).populate("creator");

        if (String(user._id) !== String(post.creator._id)) {
            req.flash("error", "권한이 없습니다");
            return res.redirect("/post");
        }

        return res.render("postUpdate", { title: `${post.title}`, post });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = async (req, res) => {
    const {
        params: { postId },
        body,
        user,
    } = req;
    try {
        const post = await Post.findById(postId).populate("creator");

        if (String(user._id) !== String(post.creator._id)) {
            req.flash("error", "권한이 없습니다");
            return res.redirect("/post");
        }

        const updatePost = await Post.findByIdAndUpdate(postId, {
            ...body,
        });

        console.log(updatePost);

        return res.redirect(`/post/${updatePost._id}`);
    } catch (error) {
        console.log(error);
    }
};

export const remove = async (req, res) => {
    const {
        params: { postId },
        user,
    } = req;
    try {
        const post = await Post.findById(postId).populate("creator");

        if (String(user._id) !== String(post.creator._id)) {
            req.flash("error", "권한이 없습니다");
            return res.redirect("/post");
        }

        await Post.findByIdAndDelete(postId);

        return res.redirect(`/post`);
    } catch (error) {
        console.log(error);
    }
};
