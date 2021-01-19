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
      if(account.provider === 'github'){
        userInfo.access_token = account
        userInfo.metadata = metadata
        return true
      }
      return false
    },
    session: async(session)=> {
      if(session.user){
        Object.assign(session.user, {
          login: userInfo.metadata.login,
          token: userInfo.access_token
        }) 
      }
      return session

    },
    redirect: async () => Promise.resolve('/login'),
  },
  site: process.env.NEXTAUTH_URL,
}

export default function Api(req, res) {
  return NextAuth(req, res, options)
}
