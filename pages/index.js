/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react'
import Card from '../components/Card'
import Search from '../components/Search'
import { useState, useRef } from 'react'
import Fuse from 'fuse.js'
import Metastore from '../lib/Metastore'
import { ALL_REPOSITRIES } from '../lib/queries'
import { initializeApollo } from '../lib/apolloClient'

export default function Home({ datasets }) {

  const [dataState, setDataState] = useState(datasets)
  const selectRef = useRef()
  
  const handlSearch = function (keyword) {
    if (keyword.length === 0) {
      setDataState(datasets)
    } else {
      const sortOrder = selectRef.current.value
      const fuse = new Fuse(datasets, {
        keys: ['title'],
        sortFn: (a, b) => { 
          if (sortOrder === 'AZ'){
            return a.item['0'].v.localeCompare(b.item['0'].v) 
          }else {
            return b.item['0'].v.localeCompare(a.item['0'].v) 
          }
          
        },
      })
      let data = fuse.search(keyword)
      
      data = data.map((value) => {
        let { item } = value
        return item
      })
      setDataState(data)
    }
    
  }

  return (
    <div className="pl-2 pr-2 pt-1 pb-1 md:p-4 lg:pt-10 lg:pb-10 lg:pl-20 lg:pr-20">
      <h2 className="font-lato text-4xl text-black pt-2 md:p-4">Datasets</h2>
      <div className="grid grid-cols-1 justify-end mt-10 lg:grid-cols-2">
        <Search submbitEvent={handlSearch} />
        <div className="grid grid-cols-1 mt-10 sm:grid-cols-4 lg:mt-0">
          <h3 className="hidden mr-4 sm:flex pt-2 lg:pt-4 justify-end col-span-1">
            Sort by:
          </h3>
          <select
            id="cars"
            className="border-2 focus:outline-none bg-white font-karla font-karla rounded-md p-2 col-span-3"
            ref={selectRef}
          >
            <option value="AZ">Alphabetical Ascending (A to Z)</option>
            <option value="ZA">Alphabetical Descending (Z to A)</option>
          </select>
        </div>
      </div>
      <div className="mt-12">
        <div className="mb-10">
          Showing {dataState.length} of {datasets.length} datasets
        </div>
        <div className="grid grid-cols-1 gap-x-20 gap-y-10 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {dataState.map((value, i) => {
            return <Card props={value} key={i} />
          })}
          {(() => {
            if (!dataState.length) {
              return <p><strong>No results found for this search query.</strong></p>
            }
          })()}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_REPOSITRIES,
  })

  const metastore = new Metastore(apolloClient.cache.extract())
  const datasets = await metastore.search()

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      datasets,
    },
  }
}
