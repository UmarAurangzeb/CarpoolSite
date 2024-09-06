import React from 'react'
import AddCarSection from '../Nextcomponents/AddCarSection'
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";
export default async function page() {
    const session = await getServerSession(authOptions);
    console.log("session in client", session);
    if (!session) {
        redirect('/register?callbackUrl=/addcar');
    }
    return (
        <div>
            <AddCarSection email={session.user.email} />
        </div>
    )


}
