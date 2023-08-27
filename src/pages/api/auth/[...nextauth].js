import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import yourDatabaseQueryToFetchUserData from "./getuser";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        mobileNo: { label: "Phone", type: "text", placeholder: "01866115239" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // Implement your own logic to validate credentials and fetch user data
        const user = await yourDatabaseQueryToFetchUserData(credentials.mobileNo);
        if (user && user.password === credentials.password) {
          return user;
        }
        return null;
      }
    })
  ],
  // callbacks: {
  //   async session(session, user) {
  //     if (user) {
  //       const userData = await yourDatabaseQueryToFetchUserData(user.phone);
  //       session.role = userData.role || [];
  //       session.zonal_code = userData.zonal_code || [];
  //       session.pbs_code = userData.pbs_code || [];
  //     }
  //     return session;
  //   },
  // },
  pages: {
    signIn: "/login"
  }
};

export default NextAuth(authOptions);
