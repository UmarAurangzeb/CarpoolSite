// next-auth.d.ts

import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface User {
        isVerified?: boolean;
    }

    interface Session {
        user: {
            isVerified?: boolean;
        } & DefaultSession["user"];
    }

    interface JWT {
        isVerified?: boolean;
    }
}