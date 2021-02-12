import { decrypt } from "../../../lib/jwt";
import Metastore from "../../../lib/Metastore";
import Permissions from "../../../lib/Permissions";
import { initializeApollo } from '../../../lib/apolloClient'
import { PERMISSIONS } from '../../../lib/queries'


export default async function handler(req, res) {
  const apolloClient = initializeApollo();
  await apolloClient.query({query: PERMISSIONS})
  const metastore = new Metastore();
  const permissions = new Permissions(apolloClient.cache.extract());
  try {
    const { id: objectId } = req.query;
    const { userInfo } = req.cookies;
    const user = decrypt(userInfo);

    if (!await permissions.userHasPermission(user.login, objectId, "write")) {
      res.status(401).send("Unauthorized User");
    }

    if (req.method === "POST") {
      const { metadata } = req.body;
      return metastore
        .update(objectId, user, metadata, user.token.accessToken)
        .then(() => {
          res.status(200).send({ success: true });
        })
        .catch((error) => {
          console.log(error);
          return res.status(400).send(error);
        });
    } else {
      res.status(404).send("Method not allowed");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "Bad Request",
      message: error.message,
    });
  }
}
