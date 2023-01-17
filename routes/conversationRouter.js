import express from "express";
import { onlyEmailVerified, onlyUser } from "../utils/protectAuth.js";
import protectCSRFToken from "../utils/protectCSRFToken.js";
import { detail } from "../controllers/conversationController.js";

const conversationRouter = express.Router();

conversationRouter.get("/:id", detail);

export default conversationRouter;
