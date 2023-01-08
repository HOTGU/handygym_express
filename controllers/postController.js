import Post from "../models/Post.js";

export const fetch = async (req, res) => {
    const {
        query: { page = 1 },
    } = req;
    const searchQuery = new Object();
    let searchQueryString = "";
    if (req.query.searchTerm) {
        searchQuery.title = { $regex: req.query.searchTerm };
        searchQueryString += `&searchTerm=${req.query.searchTerm}`;
    }
    if (req.query.category) {
        searchQuery.category = req.query.category;
        searchQueryString += `&category=${req.query.category}`;
    }
    try {
        let PAGE = +page;

        const PAGE_SIZE = 1;
        const TOTAL_POSTS = await Post.countDocuments(searchQuery);
        const TOTAL_PAGE = Math.ceil(TOTAL_POSTS / PAGE_SIZE) || 1;

        if (!PAGE || PAGE < 1 || PAGE > TOTAL_PAGE) {
            return res.redirect(`/post?page=1${searchQueryString}`);
        }

        const posts = await Post.find(searchQuery)
            .skip(PAGE_SIZE * (PAGE - 1))
            .limit(PAGE_SIZE)
            .populate("creator");

        return res.render("post", { title: "게시판", posts, totalPage: TOTAL_PAGE });
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

        return res.render("postUpdate", {
            title: `${post.title}`,
            post,
            csrfToken: req.csrfToken(),
        });
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

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                ...body,
            },
            { new: true }
        );

        return res.redirect(`/post/${updatedPost._id}`);
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
