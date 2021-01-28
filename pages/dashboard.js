/* eslint-disable react/react-in-jsx-scope */
import { useSession } from 'next-auth/client'
import Dashboard from '../components/Dashboard'

export default function DashBoard() {
  const [session, ] = useSession()
  return (
    <>
      {!session &&
        
          // eslint-disable-next-line max-len
          (<div className="max-w-2xl mx-auto mt-20 mb-60 p-20 mb-80">
            <div className="font-lato">
              {' '}
              Login to see DashBoard
            </div>
          </div>)
      }

      {session && session.user && (
        <>
          <Dashboard name={session.user.name}
            image={session.user.image}
          /> 
        </>
      )}
    </>
  
  )
}