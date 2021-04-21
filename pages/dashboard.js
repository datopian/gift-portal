/* eslint-disable react/react-in-jsx-scope */
import { useSession } from 'next-auth/client'
import Link from 'next/link'
import Dashboard from '../components/Dashboard'
import { ALL_REPOSITRIES } from '../lib/queries'
import { initializeApollo } from '../lib/apolloClient'
import Metastore from '../lib/Metastore'

export default function DashBoard({ datasets }) {
  const [session] = useSession()

  if (!session) {
    return (
      <div className="flex justify-center">
        <div className="p-48">
          <h1 className="font-lato text-2xl">Signout successful!</h1>
          <div className="m-10">
            <Link href="/">
              <a className="bg-blue-600 text-white rounded-lg p-4">
                Back Home
              </a>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Dashboard
        name={session.user.name}
        image={session.user.image}
        datasets={datasets}
      />
    </>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_REPOSITRIES
  })

  const metastore = new Metastore(apolloClient.cache.extract())
  const datasets = await metastore.search()

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      datasets,
      revalidate: 30
    }
  }
}

