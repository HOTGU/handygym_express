import express from "express";
import { onlyEmailVerified, onlyUser } from "../utils/protectAuth.js";
import protectCSRFToken from "../utils/protectCSRFToken.js";
import { detail, fetch } from "../controllers/conversationController.js";
import saveCurrentUrl from "../utils/saveCurrentUrl.js";

const conversationRouter = express.Router();

conversationRouter.get("/", onlyUser, onlyEmailVerified, fetch);
conversationRouter.get("/:id", onlyUser, onlyEmailVerified, saveCurrentUrl, detail);

export default conversationRouter;
