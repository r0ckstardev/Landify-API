import { Router } from "express";


export const adminRouter = new Router()

adminRouter.get("/getusers", (req, res, next) => {
    res.send("Hello nigga")
})