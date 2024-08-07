import { render } from "@react-email/render"
import { Resend } from "resend"
import EmailTemplate from "../../../../emails/Emailtemplate";
import { v4 as uuidv4 } from 'uuid';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function SendEmail(email: string, verificationtoken: string) {
    console.log("hello from verification")
    // const verificationToken = uuidv4();
    const { data, error } = await resend.emails.send({
        from: 'Fast Carpool <no-reply@fastcarpool.live>',
        to: email,
        subject: 'Verify Email for fastcarpool',
        react: EmailTemplate({ token: verificationtoken }),
    });
    if (error) {
        return Response.json({ message: "email failed", error: error }, { status: 400 });
    }
    return Response.json({ message: "email sent successfully", data: data }, { status: 200 });
}