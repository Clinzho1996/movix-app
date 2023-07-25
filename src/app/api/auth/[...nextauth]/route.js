import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        //Check if the user exists.
        await connect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        // store the user id from MongoDB to session
        const sessionUser = await User.findOne({ email: session.user.email });

        if (sessionUser && sessionUser._id) {
          // If the user is found and has a valid _id property, assign it to the session user
          session.user.id = sessionUser._id.toString();
        }

        return session;
      } catch (error) {
        // Handle any errors that might occur during the process
        console.error("Error fetching user data for session:", error);
        throw new Error("Internal Server Error");
      }
    },
    async signIn({ profile }) {
      try {
        await connect();

        // Check if user already exists by email
        const existingUser = await User.findOne({ email: profile.email });

        if (!existingUser) {
          // If not, create a new document and save the user in MongoDB
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        } else if (existingUser.name === null) {
          // If a user with the same email exists but has a null name, update the name
          existingUser.username = profile.name.replace(" ", "").toLowerCase();
          existingUser.image = profile.picture;
          await existingUser.save();
        }

        // Remove users with null names (if any)
        await User.deleteMany({ name: null });

        return true;
      } catch (error) {
        console.error("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
  pages: {
    error: "/",
  },
});

export { handler as GET, handler as POST };
