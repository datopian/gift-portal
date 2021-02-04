/* eslint-disable max-len */
import React from "react";
// import { useState, useEffect } from "react";
import { repoHasResource } from "../lib/utils";

export default function Dashboard({ name, datasets }) {
  //TODO: Filter datasets by user permission
  // useEffect(() => {
  //   async function filterDataByPermission() {
  //   }
  //   filterDataByPermission();
  // }, []);

  if (!datasets) return <div>Loading</div>;

  return (
    <div id="dashboard-list">
      <div className="grid grid-rows-1 grid-flow-col place-content-center">
        <div>
          <h1 className="dashboard-text-h1">Hi {name}</h1>
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
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      ></th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {datasets.map((repo, i) => {
                      return (
                        <tr key={`${i}-index`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {repo.name}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {repoHasResource(repo) ? (
                              <a
                                href={`/admin/publisher/${repo.name}`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit fiscal data schema
                              </a>
                            ) : (
                              <a
                                href={`/admin/publisher/${repo.name}`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Create a fiscal data schema
                              </a>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
