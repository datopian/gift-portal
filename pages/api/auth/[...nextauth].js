import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET
    })
  ],
  callbacks: {
    signIn: async (user, account, metadata) => {
      user.token = account.accessToken
      user.login = metadata.login
      return true
    },
    jwt: async (token, user) => {
      if (user) {
        token = user
      }
      return token
    },
    session: async (session, user) => {
      session.user = user
      return session
    },
    redirect: async () => {
      return Promise.resolve('/dashboard')
    }
  },
  site: process.env.NEXTAUTH_URL
}

export default function Api(req, res) {
  return NextAuth(req, res, options)
}
