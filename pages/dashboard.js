/* eslint-disable react/react-in-jsx-scope */
import { useSession } from "next-auth/client";
import { useCookies } from "react-cookie";
import Dashboard from "../components/Dashboard";
export default function DashBoard({ metaStoreCache }) {
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
            metaStoreCache={metaStoreCache}
          />
        </>
      )}
    </>
  );
}
