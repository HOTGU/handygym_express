import express from "express";
import { onlyEmailVerified, onlyUser } from "../utils/protectAuth.js";
import protectCSRFToken from "../utils/protectCSRFToken.js";
import { detail, fetch } from "../controllers/conversationController.js";
import saveCurrentUrl from "../utils/saveCurrentUrl.js";

const conversationRouter = express.Router();

conversationRouter.get("/", fetch);
conversationRouter.get("/:id", saveCurrentUrl, detail);

export default conversationRouter;
