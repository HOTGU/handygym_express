import express from "express";
import {
    detail,
    fetch,
    like,
    remove,
    update,
    updatePost,
    upload,
    uploadPost,
} from "../controllers/postController.js";
import { onlyEmailVerified, onlyUser } from "../utils/protectAuth.js";
import protectCSRFToken from "../utils/protectCSRFToken.js";

const postRouter = express.Router();

postRouter.get("/", fetch);

postRouter
    .route("/upload")
    .all(onlyUser, onlyEmailVerified, protectCSRFToken)
    .get(upload)
    .post(uploadPost);

postRouter.route("/:postId").get(onlyUser, onlyEmailVerified, detail);
postRouter.route("/:postId/like").get(onlyUser, onlyEmailVerified, like);

postRouter.get("/:postId/remove", onlyUser, onlyEmailVerified, remove);

postRouter
    .route("/:postId/update")
    .all(onlyUser, onlyEmailVerified, protectCSRFToken)
    .get(update)
    .post(updatePost);

export default postRouter;
