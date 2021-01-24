import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

let userInfo = {}
let accessToken
const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },

  callbacks: {
    signIn: async (user, account, metadata)=> { 
      if(account.provider === 'github'){
        if(metadata && metadata.login){
          Object.assign(userInfo, {
            login: metadata.login
          })
        }
        if(account) accessToken = account
        
        return true
      }
      return false
    },
    session: async(session)=> {
      Object.assign(session, {
        login: userInfo.login,
        token: accessToken
      })
      return session
    },
    redirect: async () => Promise.resolve('/login'),
  },
  site: process.env.NEXTAUTH_URL,
}

export default function Api(req, res) {
 
  return NextAuth(req, res, options)
}
