import { Router } from "express";
import { createUser, logUser,  } from "../controllers/auth.js";

export const authRouter = new Router()


authRouter.post("/login", (req, res, next) => {
    logUser(req, res, next)
})

authRouter.post("/register", (req, res, next) => {
    createUser(req, res, next)
})