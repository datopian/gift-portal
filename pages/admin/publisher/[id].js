import React from "react";
import { DatasetEditor } from "giftpub";
import Error from "next/error";
import Metastore from "../../../lib/Metastore";
import { SINGLE_REPOSITORY } from "../../../lib/queries";
import { initializeApollo } from "../../../lib/apolloClient";

export default function Publisher({ lfsServerUrl, dataset }) {
  const config = {
    dataset: dataset,
    lfsServerUrl: lfsServerUrl,
    authorizeApi: "/api/authorize/",
    metastoreApi: "/api/dataset/",
  };
  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    <>
      {dataset && <DatasetEditor config={config} />}
      {!dataset && <Error statusCode={404} />}
    </>
  );
}

export async function getServerSideProps(context) {
  const apolloClient = initializeApollo();
  const id = context.query.id;

  await apolloClient.query({
    query: SINGLE_REPOSITORY,
    variables: { name: id },
  });

  const metastore = new Metastore(apolloClient.cache.extract());
  const data = await metastore.fetch(id);
  return {
    props: {
      lfsServerUrl: process.env.GIFTLESS_SERVER,
      dataset: data,
    },
  };
}
