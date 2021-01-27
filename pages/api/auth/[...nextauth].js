import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { encrypt } from '../../../lib/jwt'


let userInfo
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
        if(metadata && metadata.login && !userInfo){
          userInfo = {
            login: metadata.login,
            name: metadata.name,
            email: metadata.email
          }
          if(account) userInfo.token = account
        }
        return true
      }
      return false
    },
    session: async(session)=> {
      Object.assign(session, {
        userInfo: encrypt(userInfo) ,
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
