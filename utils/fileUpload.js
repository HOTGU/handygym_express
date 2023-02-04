import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS,
        secretAccessKey: process.env.AWS_S3_SCERET,
    },
    region: process.env.AWS_S3_REGION,
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: "v4",
});

export const s3AvatarUpload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.AWS_S3_BUCKET,
        acl: "public-read",
        key: function (req, file, cb) {
            console.log(file);
            cb(null, Date.now() + file.originalname);
        },
    }),
});

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
