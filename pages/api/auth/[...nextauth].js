import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

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
    redirect: async () => Promise.resolve('/login'),
  },
  site: process.env.NEXTAUTH_URL,
};

export default function Api(req, res) {
  return NextAuth(req, res, options);
}
