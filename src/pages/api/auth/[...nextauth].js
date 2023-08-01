import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import yourDatabaseQueryToFetchUserData from "./getuser";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session(session, user) {
      if(session.token.email){
        // console.log("User object in session callback:", session);
      // Fetch additional user data including roles from your backend or database
      const userData = await yourDatabaseQueryToFetchUserData(session.token.email);
      const role = userData.role || [];

      // Add roles to the session object
      session.role = { ...session.user, role };
      return session;
      } else {
        return session;
      }
       
    },
  },
  pages:{
    signIn:"/login"
  }
}

export default NextAuth(authOptions)