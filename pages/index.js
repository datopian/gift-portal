import Card from "../components/Card";
import Search from "../components/Search";
import { loadDataFromGithub } from "../db/db";
import { useState } from 'react';
import Fuse from 'fuse.js'

export default function Home({ catalogs }) {
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
        <div className="mb-10">showing {dataState.length} of {dataState.length} dataset</div>
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
  
  let [_, descatalogs] = await loadDataFromGithub();
  

  return {
    props: { catalogs: descatalogs  
    },
    revalidate: 4, // set the seconds to automatically rebuild the  page. 4 is 4 seconds
  };
}
