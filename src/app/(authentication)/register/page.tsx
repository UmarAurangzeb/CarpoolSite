import RegisterForm from "../../Nextcomponents/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
export default async function RegisterPage() {
    const session = await getServerSession(authOptions);
    console.log("session from register", session);
    if (session) {
        redirect("/");
    }
    return (

        <div className="flex h-screen justify-center items-center">
            <section className=" flex items-center justify-center mt-36 mb-20">
                <RegisterForm />
            </section>

        </div>

    );
}