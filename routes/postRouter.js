import express from "express";
import {
    detail,
    fetch,
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

postRouter.route("/:postId").get(detail);

postRouter.get("/:postId/remove", remove);

postRouter.route("/:postId/update").get(update).post(updatePost);

export default postRouter;
