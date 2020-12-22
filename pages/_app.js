// import '../styles/globals.css'
import '../styles/tailwind.css';
import Layout from '../components/Layout';
import { MetaStoreContext } from '../lib/clientmetastore';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [metaStore, setMetaStore] = useState({});
  return (
    <Layout>
      <MetaStoreContext.Provider value={{metaStore, setMetaStore}}>
       <Component {...pageProps} />
      </MetaStoreContext.Provider>
     
    </Layout>
  )
}

export default MyApp;
