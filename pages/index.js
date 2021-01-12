/* eslint-disable max-len */
import React from 'react'
import Card from '../components/Card'
import Search from '../components/Search'
import { loadDataFromGithub } from '../db/db'
import { useState } from 'react'
import Fuse from 'fuse.js'

export default function Home({ catalogs }) {
  const [dataState, setDataState] = useState(catalogs)

  const fuse = new Fuse(catalogs, {
    keys: ['title', 'geo.country', 'description'],
  })

  const handlSearch = function(keyword){
    let data = fuse.search(keyword)
    data = data.map((value)=>{
      let {item} = value
      return item
    })
    setDataState(data)
  }

  return (
    <div className="pl-20 pr-20 pt-10 pb-10">
      <h2 className="font-lato text-4xl text-black">Datasets</h2>
      <div className="flex flex-row justify-between mt-10">
        <Search submbitEvent={handlSearch} />
        <div className="flex justify-between items-center">
          <h3 className="mr-4">Sort by:</h3>
          <select
            id="cars"
            className="border-2 focus:outline-none bg-white font-karla font-karla rounded-md p-4"
          >
            <option value="AZ">Alphabetical Ascending (A to Z)</option>
            <option value="ZA">Alphabetical Descending (Z to A)</option>
          </select>
        </div>
      </div>
      <div className="mt-12">
        <div className="mb-10">Showing {dataState.length} of {dataState.length} datasets</div>
        <div className="grid grid-cols-1 gap-x-20 gap-y-10 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {dataState.map((value, i) => {
            return <Card props={value} key={i} />
          })}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  
  let [, descatalogs] = await loadDataFromGithub()
  

  return {
    props: { catalogs: descatalogs  
    },
    revalidate: 604800, // set the seconds to automatically rebuild the  page. 604800 seconds == 1 week
  }
}
