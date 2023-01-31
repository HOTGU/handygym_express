import express from "express";
import {
    detail,
    fetch,
    fetchLike,
    like,
    remove,
    update,
    updatePost,
    upload,
    uploadPost,
} from "../controllers/gymController.js";
import { gymUpload } from "../utils/fileUpload.js";
import { onlyEmailVerified, onlyUser } from "../utils/protectAuth.js";
import protectCSRFToken from "../utils/protectCSRFToken.js";

const gymRouter = express.Router();

gymRouter.get("/", onlyUser, onlyEmailVerified, fetch);
gymRouter.get("/like", onlyUser, onlyEmailVerified, fetchLike);

gymRouter
    .route("/upload")
    .all(onlyUser, onlyEmailVerified)
    .get(protectCSRFToken, upload)
    .post(gymUpload.array("gymPhotos", 10), protectCSRFToken, uploadPost);

gymRouter.get("/:gymId", onlyUser, detail);
gymRouter.get("/:gymId/like", onlyUser, like);

gymRouter
    .route("/:gymId/update")
    .all(onlyUser, onlyEmailVerified)
    .get(protectCSRFToken, update)
    .post(gymUpload.array("gymPhotos", 10), protectCSRFToken, updatePost);

gymRouter.get("/:gymId/remove", onlyUser, remove);

export default gymRouter;
