/* eslint-disable react/react-in-jsx-scope */
import "../styles/tailwind.css";
import Layout from "../components/Layout";
import { Provider } from "next-auth/client";
import "../styles/pub.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { Metastore } from "../lib/Metastore";

function MyApp({ Component, pageProps, metaStoreCache }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Provider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} metaStoreCache={metaStoreCache} />
        </Layout>
      </Provider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const metastore = new Metastore();
  // Initialize Metastore Cache. This is made available in all pages
  const metaStoreCache = await metastore.initCache();
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps, metaStoreCache };
};

export default MyApp;
