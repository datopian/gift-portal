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
import filesize from 'filesize'


if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  require('../../mocks')
}

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
        accessor: item
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

  /**
   * Test whether to show a particular section in the metadata field
   * or not
   * @param {*} fields
   */
  const showSection = (fields) => {
    let display = []
    fields.forEach((field) => {
      dataset[field] == '' || dataset[field] == undefined
        ? display.push(false)
        : display.push(true)
    })
    return display.some((truth) => truth == true)
  }

  if (!datasetid) {
    return 404
  } else {
    return (
      <div className='p-2 md:p-8 xl:p-12 2xl:p-24'>
        <div className='flex flex-row mb-10'>
          {dataset.logo && (
            <img src={dataset.logo} alt='dataset logo' className='mr-2' />
          )}
          <div className='pt-10 xl:pt-0'>
            <div className='mb-5'>
              <h1 className='font-lato font-bold text-2xl'>{dataset.title}</h1>
            </div>
            <div className='flex flex-wrap font-roboto text-portal1'>
              {dataset['tags'] &&
                dataset['tags'].map((tag, index) => {
                  return (
                    <div
                      key={index + '@tags'}
                      className='flex border-2 text-center rounded-lg p-2 m-4'
                    >
                      {tag.toUpperCase()}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
        <div className='flex mb-10'>
          <h2 className='mr-10 font-lato font-bold text-xl'>
            About this Dataset
          </h2>
          {/* <a href="#">
            <img src="/share.svg" alt="next" />
          </a> */}
        </div>
        <div className='mb-20 font-karla text-lg'>{dataset.description}</div>
        <h2 className='mb-10 font-lato font-bold text-xl'>File Preview</h2>
        <div className='mb-10'>
          {data && data.length != 0 ? (
            <CustomTable data={data} columns={columns} />
          ) : (
            'No preview is available for this dataset'
          )}
        </div>
        <h2 className='mb-10 font-lato font-bold text-xl'>Download</h2>

        <div className='overflow-x-auto mb-10'>
          {Object.keys(dataset).includes('resources') &&
          dataset.resources.length ? (
              <table className='table-auto text-left text-sm mb-10 sm:mb-20 sm:text-base'>
                <thead className='bg-portal3'>
                  <tr>
                    <th className='border border-black border-opacity-50 p-1 sm:p-4'>
                    File size
                    </th>
                    <th className='border border-black border-opacity-50 p-1 sm:p-4'>
                    File name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataset.resources.map((resource, index) => {
                    return (
                      <>
                        <tr key={index + '@resource'}>
                          <td className='border border-black border-opacity-50 p-1 sm:p-4 lg:p-6'>
                            {filesize(resource.bytes)}
                          </td>
                          <td className='border border-black border-opacity-50 p-1 sm:p-4 lg:p-6'>
                            <a
                              className='resource-download'
                              href={`/api/dataset/${dataset.name}/files/default/${resource.path}`}
                              download
                            >
                              {resource.name}
                            </a>
                          </td>
                        </tr>
                      </>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              'There is no resource available to download.'
            )}
        </div>
        <h1 className='mb-10 font-lato font-bold text-xl'>Metadata</h1>
        <div className='grid grid-cols-1 ml-4 font-karla xl:max-w-screen-2xl'>
          <br />
          {showSection(['tags', 'disaggregation', 'budget_stage']) && (
            <>
              <h2 className='mb-10 font-lato text-xl'>General</h2>
              <div className='grid grid-cols-1 gap-y-10 font-roboto mb-10 sm:grid-cols-2 lg:grid-cols-3 2xl:max-w-50'>
                {dataset.tags && (
                  <div className='flex flex-row'>
                    <img src='/metas.svg' alt='next' className='mr-4' />
                    <div>
                      <h2 className='text-portal4 font-lato'>Tags</h2>

                      <div className='self-center'>
                        <ul>
                          {dataset.tags.map((val, i) => {
                            return <li key={'tags@' + i}>{val}</li>
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                {dataset.disaggregation && (
                  <div className='flex flex-row'>
                    <img src='/metas.svg' alt='next' className='mr-4' />
                    <div>
                      <h2 className='text-portal4 font-lato'>Disaggregation</h2>

                      <div className='self-center'>
                        <ul>
                          {dataset.disaggregation.map((val, i) => {
                            return <li key={'dissa@' + i}>{val}</li>
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                {dataset.budget_stage && (
                  <div className='flex flex-row'>
                    <img src='/metas.svg' alt='next' className='mr-4' />
                    <div>
                      <h2 className='text-portal4 font-lato'>Budget stage</h2>

                      <div className='self-center'>
                        <ul>
                          {dataset.budget_stage.map((val, i) => {
                            return <li key={'budstage@' + i}>{val}</li>
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <hr />
              <br />
            </>
          )}
          {showSection([
            'author_website',
            'author_email',
            'pub_institutional_name',
          ]) && (
            <>
              <h2 className='mb-10 font-lato text-xl'>Owner</h2>
              <div className='grid grid-cols-1 gap-y-10 font-roboto mb-10 sm:grid-cols-2 lg:grid-cols-3 2xl:max-w-50'>
                {dataset.author_website && (
                  <div className='flex flex-row'>
                    <img src='/metas.svg' width='25' className='mr-4' />
                    <div>
                      <h2 className='text-portal4 font-lato'>Author Website</h2>

                      <div className='self-center'>
                        {dataset.author_website}
                      </div>
                    </div>
                  </div>
                )}
                {dataset.author_email && (
                  <div className='flex flex-row'>
                    <img src='/profile.svg' width='25' className='mr-4' />
                    <div>
                      <h2 className='text-portal4 font-lato'>Author Email</h2>

                      <div className='self-center'>{dataset.author_email}</div>
                    </div>
                  </div>
                )}
                {dataset.pub_institutional_name && (
                  <div className='flex flex-row'>
                    <img src='/profile.svg' width='25' className='mr-4' />
                    <div>
                      <h2 className='text-portal4 font-lato'>
                        Publishers institutional name
                      </h2>

                      <div className='self-center'>
                        {dataset.pub_institutional_name}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <hr />
              <br />
            </>
          )}
          {showSection(['continent', 'country', 'region', 'city']) && (
            <>
              <h2 className='mb-10 font-lato text-xl'>Location</h2>
              <div className='grid grid-cols-1 gap-y-10 font-roboto mb-10 sm:grid-cols-2 lg:grid-cols-3 2xl:max-w-50'>
                {dataset.continent && (
                  <div className='flex flex-row'>
                    <img src='/metas.svg' width='25' className='mr-4' />
                    <div>
                      <h2 className='text-portal4 font-lato'>Continent</h2>

                      <div className='self-center'>{dataset.continent}</div>
                    </div>
                  </div>
                )}
                {dataset.country && (
                  <div className='flex flex-row'>
                    <img src='/metas.svg' width='25' className='mr-4' />
                    <div>
                      <h2 className='text-portal4 font-lato'>Country</h2>

                      <div className='self-center'>{dataset.country}</div>
                    </div>
                  </div>
                )}
                {dataset.region && (
                  <div className='flex flex-row'>
                    <img src='/metas.svg' width='25' className='mr-4' />
                    <div>
                      <h2 className='text-portal4 font-lato'>Region</h2>
                      <div className='self-center'>{dataset.region}</div>
                    </div>
                  </div>
                )}
                {dataset.city && (
                  <div className='flex flex-row'>
                    <img src='/metas.svg' width='25' className='mr-4' />
                    <div>
                      <h2 className='text-portal4 font-lato'>City</h2>
                      <div className='self-center'>{dataset.city}</div>
                    </div>
                  </div>
                )}
              </div>
              <hr />
              <br />
            </>
          )}
          {showSection([
            'Periodicity',
            'createdAt',
            'updatedAt',
            'years_included',
          ]) && (
            <>
              <h2 className='mb-10 font-lato text-xl'>Time</h2>
              <div className='grid grid-cols-1 gap-y-10 font-roboto mb-10 sm:grid-cols-2 lg:grid-cols-3 2xl:max-w-50'>
                {dataset.periodicity && (
                  <div className='flex flex-row'>
                    <img src='/metas.svg' width='25' className='mr-4' />
                    <div>
                      <h2 className='text-portal4 font-lato'>Periodicity</h2>
                      <div className='self-center'>{dataset.periodicity}</div>
                    </div>
                  </div>
                )}
                {dataset.createdAt && (
                  <div className='flex flex-row'>
                    <img src='/calender.svg' alt='next' className='mr-4' />
                    <div>
                      <h2 className='text-portal4 font-lato'>Created</h2>
                      <div className='self-center'>
                        {dayjs().to(dayjs(dataset.createdAt))}
                      </div>
                    </div>
                  </div>
                )}

                {dataset.updatedAt && (
                  <div className='flex flex-row'>
                    <img src='/check.svg' alt='next' className='mr-4' />
                    <div>
                      <h2 className='text-portal4 font-lato'>Updated</h2>
                      <div className='self-center'>
                        {dayjs().to(dayjs(dataset.updatedAt))}
                      </div>
                    </div>
                  </div>
                )}
                {dataset.years_included && (
                  <div className='flex flex-row'>
                    <img src='/check.svg' alt='next' className='mr-4' />
                    <div>
                      <h2 className='text-portal4 font-lato'>Years included</h2>
                      <div className='self-center'>
                        <ul>
                          {dataset.years_included.map((val, i) => {
                            return <li key={'yrincluded@' + i}>{val}</li>
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <hr />
              <br />
            </>
          )}
          {showSection(['start_date', 'end_date']) && (
            <>
              <h2 className='mb-10 font-lato text-xl'>Fiscal period</h2>
              <div className='grid grid-cols-1 gap-y-10 font-roboto mb-10 sm:grid-cols-2 lg:grid-cols-3 2xl:max-w-50'>
                {dataset.start_date && (
                  <div className='flex flex-row'>
                    <img src='/calender.svg' alt='next' className='mr-4' />
                    <div>
                      <h2 className='text-portal4 font-lato'>
                        Fiscal start period
                      </h2>
                      <div className='self-center'>{dataset.start_date}</div>
                    </div>
                  </div>
                )}

                {dataset.end_date && (
                  <div className='flex flex-row'>
                    <img src='/calender.svg' alt='next' className='mr-4' />
                    <div>
                      <h2 className='text-portal4 font-lato'>
                        Fiscal end period
                      </h2>

                      <div className='self-center'>{dataset.end_date}</div>
                    </div>
                  </div>
                )}
              </div>
              <hr />
              <br />
            </>
          )}

          <h2 className='mb-10 font-lato text-xl'>Format</h2>
          <div className='grid grid-cols-1 gap-y-10 font-roboto mb-10 sm:grid-cols-2 lg:grid-cols-3 2xl:max-w-50'>
            <div className='flex flex-row'>
              <img src='/csv.svg' width='25' alt='next' className='mr-4' />
              <div>
                <h2 className='text-portal4 font-lato'>Format</h2>
                <div className='self-center'>CSV</div>
              </div>
            </div>
            {dataset.encoding && (
              <div className='flex flex-row'>
                <img src='/metas.svg' width='25' className='mr-4' />
                <div>
                  <h2 className='text-portal4 font-lato'>Encoding</h2>
                  <div className='self-center'>{dataset.encoding}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export async function getStaticPaths() {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query({
    query: ALL_REPOSITRIES
  })
  const repoNames = getRepoNames(data)

  return {
    paths: repoNames.map((key) => {
      return {
        params: {
          datasetid: key.replace(/\s/g, '%20')
        }
      }
    }),
    fallback:  'blocking',
  }
}

export async function getStaticProps({ params }) {
  const { datasetid } = params
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: SINGLE_REPOSITORY,
    variables: { name: datasetid }
  })

  const metastore = new Metastore(apolloClient.cache.extract())
  const dataset = await metastore.fetch(datasetid)
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      dataset
    },
    revalidate: 1
  }
}

export default Dataset
