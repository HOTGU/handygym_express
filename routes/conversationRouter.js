import express from "express";
import { onlyEmailVerified, onlyUser } from "../utils/protectAuth.js";
import protectCSRFToken from "../utils/protectCSRFToken.js";
import { detail, fetch } from "../controllers/conversationController.js";

const conversationRouter = express.Router();

conversationRouter.get("/", fetch);
conversationRouter.get("/:id", detail);

export default conversationRouter;