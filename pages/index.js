import Card from "../components/Card";
import Search from "../components/Search";
import { loadDataFromGithub } from "../db/db";
import { useState, useContext, useEffect  } from 'react';
import Fuse from 'fuse.js'
import MetaStore from '../lib/metastore';
import { join, resolve } from 'path';
import fs from 'fs';

export default function Home({ catalogs, dcatalogs }) {
  const [dataState, setDataState] = useState(catalogs);

  const fuse = new Fuse(catalogs, {
    keys: ["title", "geo.country", "description"],
  });

  const handlSearch = function(keyword){
      let data = fuse.search(keyword);
      data = data.map((value)=>{
          let {item} = value;
          return item;
      })
      setDataState(data);
  }

  return (
    <div className="pl-40 pr-40 pt-10 pb-10">
      <h3 className="font-lato text-xl text-black">DataSet</h3>
      <div className="flex flex-row justify-between mt-10">
        <Search submbitEvent={handlSearch} />
        <div className="flex justify-between items-center mr-35 pr-9">
          <h3 className="mr-4">Sort by: </h3>
          <select
            id="cars"
            className="border-2 focus:outline-none bg-white font-karla h-72px w-545px font-karla rounded-md"
          >
            <option value="AZ">Alphabetical Ascending (A to Z) </option>
            <option value="ZA">Alphabetical Descending (Z to A) </option>
          </select>
        </div>
      </div>
      <div className="mt-10">
        <div className="mb-10">showing 6 of 6 dataset</div>
        <div className="grid grid-cols-3 gap-x-40 gap-y-10">
          {dataState.map((value, i) => {
            return <Card props={value} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const metaStore = new MetaStore()
  //check if data.json is empty
  const db = resolve('./db');
  const dataPath = join(db, 'data.json');
  const sdataPath = join(db, 'sdata.json');
  const readFile = fs.readFileSync(dataPath, 'utf8')
  const readFile2 = fs.readFileSync(sdataPath, 'utf8')
  let catalogs;
  let descatalogs;

  if (fs.readFileSync(dataPath, 'utf8')) {
    console.log("from file")
    catalogs  = JSON.parse(readFile);
    descatalogs = JSON.parse(readFile2)
    metaStore.initMetaStoreFromGithub(catalogs, descatalogs);
  }else{
    [catalogs, descatalogs] = await loadDataFromGithub();
    fs.writeFileSync(dataPath, JSON.stringify(catalogs));
    fs.writeFileSync(sdataPath, JSON.stringify(descatalogs));
    metaStore.initMetaStoreFromGithub(catalogs, descatalogs);
  }
  

  return {
    props: { catalogs: metaStore.searchCatalog     
    },
  };
}
