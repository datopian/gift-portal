import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

let userInfo = {}

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      state: false,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    signIn: async (user, account, metadata)=> {
      userInfo.metadata = metadata
      return true
    },
    session: async(session)=> {
      session.github = userInfo.metadata
      return session

    },
    redirect: async () => Promise.resolve('/login'),
  },
  site: process.env.NEXTAUTH_URL,
}

export default function Api(req, res) {
  return NextAuth(req, res, options)
}
