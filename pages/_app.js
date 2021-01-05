/* eslint-disable react/react-in-jsx-scope */
import '../styles/tailwind.css'
import Layout from '../components/Layout'
import { Provider } from 'next-auth/client' 
import '../styles/pub.css'

function MyApp({ Component, pageProps }) {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Provider session={pageProps.session} >
      <Layout>
        <Component {...pageProps} />  
      </Layout>
    </Provider>
    
  )
}

export default MyApp
