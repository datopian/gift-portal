import React from 'react'
import { providers, signIn, signOut, useSession } from 'next-auth/client'

export default function SignIn({ providers }) {
  const [session, loading] = useSession();
  return (
    <>
      {!session && Object.values(providers).map(provider => (
        <div className="max-w-2xl mx-auto mt-20 mb-60 p-20 mb-80">
          <div className='font-lato'> To sign up or login, please use your existing GitHub or Google accounts</div>
          <div key={provider.name} className='mt-10'>
            <button onClick={() => signIn(provider.id)} className='bg-blue-600 text-white rounded-lg p-2 ml-40 '>Login in with {provider.name}</button>
          </div>
        </div>
      ))}

      {
        session && (
          <>
          <div className="max-w-2xl mx-auto mt-24 mb-60 pl-40 pt-10 pb-24 mb-80">
            <div className='flex'>
              <div>Sign in as: <span className='font-karla font-bold'>{session.user.name}</span></div>
              <img src={session.user.image}  width='50' height='50'className='ml-10'/>
            </div>
            
            <button onClick={signOut} className='bg-red-600 rounded-lg p-2 text-white ml-30 mt-10 w-1/2'>Logout</button>
          </div>
            
          </>
        )
      }
      
    </>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    providers: await providers(context)
  }
}