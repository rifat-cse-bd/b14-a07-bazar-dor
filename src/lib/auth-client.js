import { createAuthClient } from "better-auth/react";

// No baseURL: the auth API lives on the same domain as the app
export const authClient = createAuthClient();
export const { signIn, signUp, signOut, updateUser, useSession } = authClient;
