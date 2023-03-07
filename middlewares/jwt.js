import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import dotenv from "dotenv";
dotenv.config()

export async function signJWT(req, res, next) {
    const { username, email, role } = req.body
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    const token = await sign({
        username: user.username,
        email: user.email,
        role: user.role
    }, process.env.JWT_SECRET_KEY || "a28b3954ee8f33313a971ee70baccdda73344b0d", { expiresIn: '14d' } )
    return token;

    var a = "a"
    console.log(b || a)
};

export async function authMW(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        res.status(401).send({ message: "Message Please log in before trying to use this route." })
    } else {
    await sign(token, process.env.JWT_SECRET_KEY, (err, done) => {
        if(err) {
            res.status(401).send({ message: "Please try again later." })
        }

        next()
    })
    }
}