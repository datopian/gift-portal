/* eslint-disable react/react-in-jsx-scope */
import '../styles/tailwind.css'
import Layout from '../components/Layout'
import { Provider } from 'next-auth/client'
import '../styles/pub.css'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../mocks')
}

function MyApp({ Component, pageProps, metaStoreCache }) {
  const apolloClient = useApollo(pageProps.initialApolloState)
  return (
    <Provider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} metaStoreCache={metaStoreCache} />
        </Layout>
      </ApolloProvider>
    </Provider >
  )
}

export default MyApp
