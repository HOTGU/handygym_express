import Gym from "../models/Gym.js";

export const fetch = (req, res) => {
    return res.render("gym");
};

export const upload = (req, res) => {
    return res.render("gymUpload");
};

export const uploadPost = async (req, res) => {
    const { body, files } = req;
    try {
        const returnPath = files.map((file) => {
            return file.path;
        });
        const newGym = new Gym({
            ...body,
            photos: returnPath,
        });
        await newGym.save();
        return res.redriect("/gym");
    } catch (error) {
        console.log(error);
    }
};

export const detail = (req, res) => {
    return res.render("gymDetail");
};

export const update = (req, res) => {
    return res.render("gymUpdate");
};

export const updatePost = (req, res) => {
    res.send("Gym UpdatePost");
};

export const remove = (req, res) => {
    res.send("Gym Remove");
};
