import express from "express";
import { detail, updatePost } from "../controllers/userController.js";
import { s3AvatarUpload } from "../utils/fileUpload.js";
import { onlyEmailVerified, onlyUser } from "../utils/protectAuth.js";
import protectCSRFToken from "../utils/protectCSRFToken.js";
import saveCurrentUrl from "../utils/saveCurrentUrl.js";

const userRouter = express.Router();

userRouter
    .route("/:userId")
    .get(onlyUser, onlyEmailVerified, protectCSRFToken, saveCurrentUrl, detail);

userRouter.post(
    "/update",
    onlyUser,
    onlyEmailVerified,
    s3AvatarUpload.single("avatar"),
    protectCSRFToken,
    updatePost
);

// userRouter.route("/find-email").get(findEmail).post(findEmailPost);

// userRouter.route("/me").get(onlyUser, onlyEmailVerified, me);

// userRouter
//     .route("/change-password")
//     .all(onlyUser, onlyEmailVerified)
//     .get(changePassword)
//     .post(changePasswordPost);

export default userRouter;
