import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  pages:{
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        )
        const user = await res.json()

        if (user?.status === 'OK') {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      session.user = token as any
      return session
    },
  },
})

export { handler as GET, handler as POST }
