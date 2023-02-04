import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/avatar/");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + "-" + file.originalname);
    },
});

export const gymUpload = multer({ dest: "uploads/gym/" });
export const galleryUpload = multer({ dest: "uploads/gallery/" });

export const avatarUpload = multer({ storage }).single("avatar");
// export const avatarUpload = multer({ dest: "uploads/avatar/" });
