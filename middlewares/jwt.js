import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function signJWT(req, res, next) {
    const { username, email, role } = req.body
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    const token = await jwt.sign(
         process.env.JWT_SECRET_KEY,
        
         {
            username: user.username,
            email: user.email,
            role: user.role
        },
            { expiresIn: '14d'}
    )
    return token;
};