/* eslint-disable max-len */
import { React } from 'react'
import CustomTable from '../../components/table'
import Metastore from '../../lib/Metastore'
import { useRouter } from 'next/router'
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
import { ALL_REPOSITRIES, SINGLE_REPOSITORY } from '../../lib/queries'
import { initializeApollo } from '../../lib/apolloClient'
import { getRepoNames } from '../../lib/utils'




const Dataset = ({ dataset }) => {
  const router = useRouter()
  const { datasetid } = router.query
  let data = []
  let columns = []

  if (dataset['sample'].length > 0) {
    let sample = dataset['sample']
    columns = sample[0].map((item) => {
      return {
        Header: item,
        accessor: item,
      }
    })

    sample.slice(1, 10).map((item) => {
      let temp_obj = {}
      item.map((field, i) => {
        temp_obj[sample[0][i]] = field
      })
      data.push(temp_obj)
    })
  }

  if (!datasetid) {
    return 404
  } else {
    return (
      <div className="p-2 md:p-8 xl:p-12 2xl:p-24">
        <div className="flex flex-row mb-10">
          {dataset.logo && (
            <img src={dataset.logo} alt="dataset logo" className="mr-2" />
          )}
          <div className="pt-10 xl:pt-0">
            <div className="mb-5">
              <h1 className="font-lato font-bold text-2xl">{dataset.title}</h1>
            </div>
            <div className="flex flex-wrap font-roboto text-portal1">
              {dataset['tags'] &&
                dataset['tags'].map((tag, index) => {
                  return (
                    <div
                      key={index + '@tags'}
                      className="flex border-2 text-center rounded-lg p-2 m-4"
                    >
                      {tag.toUpperCase()}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
        <div className="flex mb-10">
          <h2 className="mr-10 font-lato font-bold text-xl">
            About this Dataset
          </h2>
          {/* <a href="#">
            <img src="/share.svg" alt="next" />
          </a> */}
        </div>
        <div className="mb-20 font-karla text-lg">{dataset.description}</div>
        <h2 className="mb-10 font-lato font-bold text-xl">File Preview</h2>
        <div className="mb-10">
          {data && data.length != 0 ? (
            <CustomTable data={data} columns={columns} />
          ) : (
            'NO PREVIEW FOR THIS DATASET'
          )}
        </div>
        <h2 className="mb-10 font-lato font-bold text-xl">Download</h2>

        <div className="overflow-x-auto">
          <table className="table-auto text-left text-sm mb-10 sm:mb-20 sm:text-base">
            <thead className="bg-portal3">
              <tr>
                <th className="border border-black border-opacity-50 p-1 sm:p-4">
                  File size (MB)
                </th>
                <th className="border border-black border-opacity-50 p-1 sm:p-4">
                  File name
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(dataset).includes('resources')
                ? dataset.resources.map((resource, index) => {
                  const filename = 'path' in resource
                    ? `${resource.name}.${resource.path
                      .split('.')
                      .pop()}`
                    : resource.name
                  return (
                    <>
                      <tr key={index + '@resource'}>
                        <td className="border border-black border-opacity-50 p-1 sm:p-4 lg:p-6">
                          {(resource.bytes * 0.000001).toFixed(1)}
                        </td>
                        <td className="border border-black border-opacity-50 p-1 sm:p-4 lg:p-6">
                          <a className="resource-download" href={`/api/dataset/${dataset.name}/files/default/${resource.path}`} download>
                            {filename}
                          </a>
                        </td>
                      </tr>
                    </>
                  )
                })
                : ''}
            </tbody>
          </table>
        </div>

        <h2 className="mb-10 font-lato font-bold text-xl">Metadata</h2>
        <div className="grid grid-cols-1 ml-4 font-karla xl:max-w-screen-2xl">
          <div className="grid grid-cols-1 gap-y-10 font-roboto mb-10 sm:grid-cols-2 lg:grid-cols-3 2xl:max-w-50">
            <div className="flex flex-row">
              <img src="/calender.svg" alt="next" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Created</h2>
                {dataset.createdAt ? (
                  <div className="self-center">
                    {dayjs().to(dayjs(dataset.createdAt))}
                  </div>
                ) : (
                  'Not Specified'
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <img src="/check.svg" alt="next" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Updated</h2>
                {dataset.updatedAt ? (
                  <div className="self-center">
                    {dayjs().to(dayjs(dataset.updatedAt))}
                  </div>
                ) : (
                  'Not Specified'
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <img src="/csv.svg" width="25" alt="next" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Format</h2>
                <div className="self-center">CSV</div>
              </div>
            </div>
            <div className="flex flex-row">
              <img src="/metas.svg" width="25" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Encoding</h2>
                {dataset.encoding ? (
                  <div className="self-center">{dataset.encoding}</div>
                ) : (
                  'Not Specified'
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <img src="/metas.svg" width="25" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Continent</h2>
                {dataset.continent ? (
                  <div className="self-center">{dataset.continent}</div>
                ) : (
                  'Not Specified'
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <img src="/metas.svg" width="25" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Country</h2>
                {dataset.country ? (
                  <div className="self-center">{dataset.country}</div>
                ) : (
                  'Not Specified'
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <img src="/metas.svg" width="25" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Region</h2>
                {dataset.region ? (
                  <div className="self-center">{dataset.region}</div>
                ) : (
                  'Not Specified'
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <img src="/metas.svg" width="25" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">City</h2>
                {dataset.city ? (
                  <div className="self-center">{dataset.city}</div>
                ) : (
                  'Not Specified'
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <img src="/metas.svg" width="25" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Author Website</h2>
                {dataset.author_website ? (
                  <div className="self-center">{dataset.author_website}</div>
                ) : (
                  'Not Specified'
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <img src="/profile.svg" width="25" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Author Email</h2>
                {dataset.author_email ? (
                  <div className="self-center">{dataset.author_email}</div>
                ) : (
                  'Not Specified'
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <img src="/calender.svg" alt="next" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Fiscal Start Period</h2>
                {dataset.start_date ? (
                  <div className="self-center">{dataset.start_date}</div>
                ) : (
                  'Not Specified'
                )}
              </div>
            </div>
            <div className="flex flex-row">
              <img src="/calender.svg" alt="next" className="mr-4" />
              <div>
                <h2 className="text-portal4 font-lato">Fiscal End Period</h2>
                {dataset.end_date ? (
                  <div className="self-center">{dataset.end_date}</div>
                ) : (
                  'Not Specified'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: ALL_REPOSITRIES,
  })
  const repoNames = getRepoNames(data)

  return {
    paths: repoNames.map((key) => {
      return {
        params: {
          datasetid: key.replace(/\s/g, '%20'),
        },
      }
    }),
    fallback: false,
  }
}




export async function getStaticProps({ params }) {
  const { datasetid } = params
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: SINGLE_REPOSITORY,
    variables: { name: datasetid },
  })

  const metastore = new Metastore(apolloClient.cache.extract())
  const dataset = await metastore.fetch(datasetid)
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      dataset,
    },
    revalidate: 1,
  }
}

export default Dataset
