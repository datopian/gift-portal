/* eslint-disable max-len */
import React from 'react'
import { providers, signIn, useSession } from 'next-auth/client'
import Dashboard from '../components/Dashboard'
import { useCookies } from 'react-cookie'


export default function SignIn({ providers }) {
  const [session, ] = useSession()

  const [, setCookie] = useCookies(['github'])

  if(session && session.userInfo){
    setCookie('userInfo', session.userInfo, { path: '/'})
  }

  return (
    <>
      {!session &&
        Object.values(providers).map((provider, i) => (
          // eslint-disable-next-line react/jsx-key
          <div key={`${i}-index@`} className="max-w-2xl mx-auto mt-20 mb-60 p-20 mb-80">
            <div className="font-lato">
              {' '}
              To sign up or login, please use your existing GitHub or Google
              accounts
            </div>
            <div key={provider.name} className="mt-10">
              <button
                onClick={() => signIn(provider.id)}
                className="bg-blue-600 text-white rounded-lg p-2 ml-40 "
              >
                Login in with {provider.name}
              </button>
            </div>
          </div>
        ))}

      {session && (
        <>
          <Dashboard name={session.user.name}
            image={session.user.image}
          /> 
        </>
      )}
    </>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
  }
}
