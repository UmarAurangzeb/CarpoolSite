import { hash } from "bcrypt"
import bcrypt from "bcrypt"
import prisma from "@/app/lib/db";
import { SendEmail } from "../../mail/sendemail";
import { v4 as uuidv4 } from 'uuid';
export async function POST(request: Request) {
    try {
        const { username, email, password } = await request.json();
        console.log({ username, email, password });

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })
        if (user && user.isVerified == true) {
            console.log("user already exists");
            return Response.json({ message: "user already exists" }, { status: 406 })
        }
        else if (user && user.isVerified == false) {
            const data = await setParams(password);
            const updateUser = await prisma.user.update({
                where: {
                    email: user.email,
                },
                data: {
                    password: data.hashedPassword,
                    verificationtoken: data.verificationtoken,
                    tokenexpiry: data.tokenExpiry,
                }
            })
            if (!updateUser) {
                return Response.json({ message: "error registering user" }, { status: 400 });
            }
            const emailres = await SendEmail(email, data.verificationtoken);
            console.log(emailres);
            if (emailres.status === 200) {
                return Response.json({ message: "User Created successfully,please verify your email" }, { status: 200 });
            }
            else if (emailres.status === 400) {
                return Response.json({ message: "error sending verification email" }, { status: 400 });
            }

        }

        else {
            const data = await setParams(password);
            const newuser = await prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    password: data.hashedPassword,
                    verificationtoken: data.verificationtoken,
                    tokenexpiry: data.tokenExpiry
                }
            })
            if (!newuser) {
                return Response.json({ message: "error creating user" }, { status: 401 })
            }
            const emailres = await SendEmail(email, data.verificationtoken);

            if (emailres.status === 200) {
                return Response.json({ message: "User Created successfully,please verify your email" }, { status: 200 });
            }
            else if (emailres.status === 400) {
                return Response.json({ message: "error sending verification email" }, { status: 400 });
            }
        }

    } catch (e) {
        console.log(e);
        return Response.json({ message: "failed registration", e }, { status: 500 });
    }

}

async function setParams(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await hash(password, salt);
    const verificationtoken = uuidv4()
    const tokenExpiry = new Date(Date.now() + 3600000);
    return { hashedPassword, verificationtoken, tokenExpiry };
}