import prisma from "@/app/lib/db";



export async function POST(req: Request) {
    try {
        const token = await req.json()
        console.log(token);
        const user = await prisma.user.findFirst({
            where: {
                verificationtoken: token
            }
        })
        if (!token || !user) {
            console.error("Token verification failed");
            return Response.json({ error: "invalid token or user not found" }, { status: 404 })
        }
        const currentTime = new Date();
        const tokenExpiry = user?.tokenexpiry as any;
        if (tokenExpiry > currentTime) {
            const updateverification = await prisma.user.update({
                where: { email: user.email },
                data: { isVerified: true, verificationtoken: '' }
            });
            if (!updateverification) {
                return Response.json({ error: "error updating user" }, { status: 409 })
            }
            return Response.json({ success: true }, { status: 200 });
        }
    } catch (error) {
        return Response.json({ error: "error verifying token" }, { status: 500 })
    }

}