import { Button, Html, Text, Tailwind } from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
    token: string;
}

export default function Emailtemplate({ token }: EmailTemplateProps) {
    return (
        <Html>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                            },
                        },
                    },
                }}
            >
                <Text className="font-bold text-2xl ml-4">To complete your email registration,click the following button</Text>
                <Button
                    href={`${process.env.BASE_URL}/verifytoken/?token=${token}`} className="mx-auto w-50"
                    style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
                >
                    Verify
                </Button>

            </Tailwind>
        </Html>
    );
}
