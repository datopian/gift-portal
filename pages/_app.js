// import '../styles/globals.css'
import '../styles/tailwind.css';
import Layout from '../components/Layout';
import { Provider } from 'next-auth/client' 
import '../styles/pub.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session} >
      <Layout>
       <Component {...pageProps} />  
      </Layout>
    </Provider>
    
  )
}

export default MyApp;
