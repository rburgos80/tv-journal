import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],

  secret: process.env.SECRET,
  database: process.env.MONGODB_URI,
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    session: async (session) => {
      session.session.user.id = session.user.id;
      return Promise.resolve(session.session);
    },
  },
});
