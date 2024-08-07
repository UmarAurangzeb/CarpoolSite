import RegisterForm from "../../Nextcomponents/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
export default async function RegisterPage() {
    const session = await getServerSession(authOptions);
    console.log("session from register", session);
    if (session && session.user.isVerified) {
        redirect("/");
    }
    return (
        <section className="h-screen flex items-center justify-center">
            <div className="w-[500px] mt-20">
                <RegisterForm />
            </div>
        </section>
    );
}