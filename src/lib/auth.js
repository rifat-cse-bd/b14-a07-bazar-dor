import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
const client = new MongoClient(process.env.BETTER_AUTH_DB_URL);
const db = client.db("better-auth-db");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    // After sign up the user is sent to the sign in page instead
    autoSignIn: false,
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      // There is no email verification in this app, so let a trusted
      // Google/GitHub login attach to an existing email/password account
      requireLocalEmailVerified: false,
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
