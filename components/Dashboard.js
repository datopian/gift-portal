/* eslint-disable max-len */
import React from 'react'
import { repoHasResource } from '../lib/utils'


export default function Dashboard({ name, datasets }) {

  if (!datasets) return <div>Loading</div>
  if (datasets.length > 1) {
    datasets.yourDatasets = 'Your datasets:'
  } else {
    datasets.yourDatasets = 'Your dataset:'
  }

  return (
    <div id='dashboard-list'>
      <div className='justify-center'>
        <h1 className='dashboard-text-h1'>Hi {name}</h1>
      </div>
      <div className='justify-center'>
        <h1 className='text-lg leading-6 font-medium text-gray-900 text-center'>
          {datasets.yourDatasets}
        </h1>
        <div className='flex flex-col items-center justify-center'>
          <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mb-4'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
              <div className='overflow-hidden sm:rounded-lg'>
                <table className='min-w-full divide-y'>
                  <thead>
                    <tr>
                      <th
                        scope='col'
                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                      ></th>
                      <th scope='col' className='relative px-6 py-3'>
                        <span className='sr-only'>Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y'>
                    {datasets.map((repo, i) => {
                      return (
                        <tr key={`${i}-index`} id='dataset-list'>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-12'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {repo.name}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                            {repoHasResource(repo) ? (
                              <a
                                href={`/admin/publisher/${repo.name}`}
                                className='edit-schema dashboardLink'
                              >
                                Edit fiscal data schema
                              </a>
                            ) : (
                              <a
                                href={`/admin/publisher/${repo.name}`}
                                className='create-schema dashboardLink'
                              >
                                  Create a fiscal data schema
                              </a>
                            )}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium pr-16'>
                            <a
                              href={`/admin/publisher/edit-metadata/${repo.name}`}
                              className='dashboardLink'
                            >
                              Edit metadata
                            </a>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
