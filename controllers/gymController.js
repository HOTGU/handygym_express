export const fetch = (req, res) => {
    res.send("Gym Fetch");
};

export const upload = (req, res) => {
    return res.render("home");
};

export const uploadPost = (req, res) => {
    res.send("Gym UploadPost");
};

export const detail = (req, res) => {
    res.send("Gym Detail");
};

export const update = (req, res) => {
    res.send("Gym Update");
};

export const updatePost = (req, res) => {
    res.send("Gym UpdatePost");
};

export const remove = (req, res) => {
    res.send("Gym Remove");
};
