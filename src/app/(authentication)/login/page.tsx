import LoginForm from "@/app/Nextcomponents/LoginForm";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
export default async function LoginPage() {
    const session = await getServerSession(authOptions);
    console.log("session from login page,", session);

    if (session && session.user.isVerified) {
        redirect("/");
    }

    return (
        <section className="h-screen flex items-center justify-center mt-6">
            <div className="w-[500px]">
                <LoginForm />
            </div>
        </section>
    );
}