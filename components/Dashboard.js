/* eslint-disable max-len */
import React from 'react'
import { signOut } from 'next-auth/client'
import Link from 'next/link'
import Github from '../lib/Github'
import { useState, useEffect } from 'react'

export default function Dashboard({ name, image, userToken }) {
  const [repoData, setRepoData] = useState([])

  useEffect(() => {
    async function getRepos() {
      const github = new Github()
      const repos = await github.getRepositoriesForUser('gift-data', userToken)
      setRepoData(repos)
    }
    getRepos()
  }, [])

  return (
    <div>
      <div className="grid grid-rows-4 grid-flow-col gap-2 place-content-center">
        <div>
          <img src={image} className="git-profile-img" />
        </div>
        <div>
          <h1 className="dashboard-text-h1">Hi {name}</h1>
        </div>
        <div>
          <button className="btn-add-fiscal">
            <Link href="/admin/publisher">
              <a> Create a new fiscal data schema</a>
            </Link>
          </button>
        </div>
        <div>
          <button className="btn-existing-fiscal">
            Add data to an existing data schema
          </button>
        </div>
      </div>
      <div className="justify-center">
        <h1 className="text-lg leading-6 font-medium text-gray-900 text-center">
          Your Dataset(s)
        </h1>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {repoData.map((repo, i) => {
                      return (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {repo.name}
                                </div>
                                {/* <div className="text-sm text-gray-500">
                                  jane.cooper@example.com
                                </div> */}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {/* <div className="text-sm text-gray-900">
                              {repo.description}
                            </div> */}
                            <div className="text-sm text-gray-500">
                              {repo.description
                                ? repo.description
                                : 'No Description'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href={repo.html_url}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='text-center'>
              <button onClick={signOut} className="rounded-lg btn-logout">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
