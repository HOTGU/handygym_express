import passport from "passport";
import User from "../models/User.js";

// strategy 생성
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
