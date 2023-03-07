import express from "express";
import { successColor } from "./utils/colors.js";
import { logger } from "./utils/logging.js";
import { authRouter } from "./routes/auth.js"
import { adminRouter } from "./routes/admin.js";
import { authMW } from "./middlewares/jwt.js";

const app = express();
const PORT = process.env.PORT || 5050

app.use(express.json());
//app.use(express.urlencoded)
app.use(logger)

app.get("/api", (req, res, next) => {
    res.status(200).send({ message: "Api Up and running."})
})

app.use("/api/auth", authRouter)
app.use("/api/admin", authMW, adminRouter)


app.listen(PORT, () => {
    console.log(`[${successColor("Listening")}]: API is up and running on port ${PORT}.`)
})
