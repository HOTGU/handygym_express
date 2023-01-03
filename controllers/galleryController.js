import Gallery from "../models/Gallery.js";

export const fetch = async (req, res) => {
    try {
        const galleries = await Gallery.find({});
        return res.render("gallery", { galleries });
    } catch (error) {
        console.log(error);
    }
};

export const upload = async (req, res) => {
    try {
        res.render("galleryUpload", { csrfToken: req.csrfToken() });
    } catch (error) {
        console.log(error);
    }
};

export const uploadPost = async (req, res) => {
    const { body, files, user } = req;
    try {
        const returnPath = files.map((file) => {
            return file.path;
        });
        await Gallery.create({
            title: body.title,
            photos: returnPath,
            creator: user._id,
        });
        return res.redirect("/gallery");
    } catch (error) {
        console.log(error);
    }
};

export const detail = async (req, res) => {
    try {
        res.render("galleryDetail");
    } catch (error) {
        console.log(error);
    }
};

export const update = async (req, res) => {
    try {
        res.render("galleryUpdate");
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
    }
};

export const remove = async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
    }
};
