/* eslint-disable react/react-in-jsx-scope */
import { useSession } from "next-auth/client";
import { useCookies } from "react-cookie";
import Dashboard from "../components/Dashboard";
import { ALL_REPOSITRIES } from "../lib/queries";
import { initializeApollo } from "../lib/apolloClient";
import Metastore from "../lib/Metastore";

export default function DashBoard({ datasets }) {
  const [session] = useSession();

  const [, setCookie] = useCookies(["github"]);

  if (session && session.userInfo) {
    setCookie("userInfo", session.userInfo, { path: "/" });
  }
  return (
    <>
      {!session && (
        // eslint-disable-next-line max-len
        <div className="max-w-2xl mx-auto mt-20 mb-60 p-20 mb-80">
          <div className="font-lato"> Login to see DashBoard</div>
        </div>
      )}

      {session && session.user && (
        <>
          <Dashboard
            name={session.user.name}
            image={session.user.image}
            datasets={datasets}
          />
        </>
      )}
    </>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_REPOSITRIES,
  });

  const metastore = new Metastore(apolloClient.cache.extract());
  const datasets = await metastore.search();

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      datasets,
    },
  };
}
