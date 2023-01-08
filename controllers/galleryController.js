import Gallery from "../models/Gallery.js";

export const fetch = async (req, res) => {
    const {
        query: { page = 1 },
    } = req;
    try {
        const LIMIT_SIZE = 1;
        const SKIP_PAGE = (page - 1) * LIMIT_SIZE;
        const TOTAL_GALLERIES = await Gallery.countDocuments();
        const TOTAL_PAGE = Math.ceil(TOTAL_GALLERIES / LIMIT_SIZE) || 1;
        const galleries = await Gallery.find({})
            .skip(SKIP_PAGE)
            .limit(LIMIT_SIZE)
            .sort({ createdAt: -1 })
            .populate("creator");
        return res.render("gallery", { galleries, totalPage: TOTAL_PAGE });
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
    const {
        body: { title, captions },
        files,
        user,
    } = req;
    try {
        const returnPhotosObj = files.map((__, index) => {
            return { photo: files[index].path, caption: captions[index] };
        });
        await Gallery.create({
            title,
            photos: returnPhotosObj,
            creator: user._id,
        });
        return res.redirect("/gallery");
    } catch (error) {
        console.log(error);
    }
};

export const detail = async (req, res) => {
    const {
        params: { galleryId },
    } = req;

    try {
        const gallery = await Gallery.findById(galleryId).populate("creator");

        return res.render("galleryDetail", {
            title: gallery.title,
            gallery,
            // comments,
        });
    } catch (error) {
        console.log(error);
    }
};
export const update = async (req, res) => {
    const {
        params: { galleryId },
    } = req;
    try {
        const gallery = await Gallery.findById(galleryId).populate("creator");
        return res.render("galleryUpdate", {
            title: gallery.title,
            gallery,
            csrfToken: req.csrfToken(),
        });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = async (req, res) => {
    const {
        params: { galleryId },
        body: { title, captions },
        files,
    } = req;
    try {
        const gallery = await Gallery.findById(galleryId);
        const returnPhotosObj = files.map((__, index) => {
            console.log(captions[index]);
            return { photo: files[index].path, caption: captions[index] };
        });

        const updatedGallery = await Gallery.findByIdAndUpdate(
            galleryId,
            {
                title,
                photos: returnPhotosObj,
            },
            {
                new: true,
            }
        );
        return res.redirect(`/gallery/${updatedGallery._id}`);
    } catch (error) {
        console.log(error);
    }
};

export const remove = async (req, res) => {
    const {
        params: { galleryId },
        user,
    } = req;
    try {
        const gallery = await Gallery.findById(galleryId).populate("creator");
        if (String(user._id) !== String(gallery.creator._id)) {
            req.flash("error", "사용자가 아닙니다!");
            res.redirect(`/gallery`);
            return;
        } else {
            await gallery.remove();
            req.flash("sucess", "삭제하였습니다.");
            res.redirect(`/gallery`);
            return;
        }
    } catch (error) {
        console.log(error);
    }
};
