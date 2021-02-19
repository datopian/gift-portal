import React from 'react'
import Link from 'next/link'
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

/**
 * Create card for each datasets.
 * e.g
 * let props = {
 *  logo: '/argentina.svg',
 *  name: 'Daily Treasury Statement (DTS)',
 *   tags: ['Budget', 'FEDERAL','SPENDING','TAG4'],
 *   description: 'CONTENT HERE',
 *   created: '10/03/2019-11/26/2020',
 *   updated: '11/30/2020',
 * }
 * <Card props={props} />
 * @param {*} props
 * @return JSX
 */
export default function Card({ props }) {
  let dataset = props
  return (
    <div
      className={
        // eslint-disable-next-line max-len
        'flex flex-col rounded-md border-2 shadow-md justify-between p-5 mb-4 min-h-500'
      }
    >
      <div>
        <div className="flex flex-row justify-between items-center">
          {dataset.logo && (
            <img src={dataset.logo} alt="next" className="mr-2" />
          )}
          <div className="font-lato text-xl">
            <Link href={`/dataset/${dataset.name}`}>
              <a>{dataset.title}</a>
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="font-lato text-xl">
            {dataset.error == true ? (
              <span style={{ color: 'red' }}>error parsing metadata!</span>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 font-roboto text-portal1">
          {dataset.tags ? (
            dataset.tags.map((value, index) => {
              return (
                <div
                  key={index}
                  className="border-2 text-center rounded-lg mt-10"
                >
                  {value}
                </div>
              )
            })
          ) : (
            <>
              <div className="border-2 text-center rounded-lg mt-10">
                NO TAGS
              </div>
              {/* 
            <div className="border-2 text-center rounded-lg">NO TAGS</div> 
            */}
            </>
          )}
        </div>
        <div className="font-karla pt-8 pb-8">{dataset.description}</div>
      </div>
      <div>
        <div className="pl-3 flex flex-col font-karla">
          <div className="flex flex-row mb-4 items-center">
            {/* eslint-disable-next-line max-len */}
            <img src="/calender.svg" alt="next" width="25px" className="mr-4" />
            <span>Created: {dayjs().to(dayjs(dataset.createdAt))}</span>
          </div>
          <div className="flex flex-row mb-4 items-center">
            <img src="/check.svg" alt="next" width="25px" className="mr-4" />
            <span>Updated: {dayjs().to(dayjs(dataset.updatedAt))}</span>
          </div>
          <div className="flex flex-row mb-8 items-center">
            <img src="/csv.svg" alt="next" width="25px" className="mr-4" />
            <span>CSV</span>
          </div>
        </div>

        <div className="flex flex-row justify-between font-karla text-portal1">
          <Link href={`/dataset/${dataset.name}`}>
            <a>VIEW DATASET DETAILS</a>
          </Link>
          <img src="/share.svg" alt="next" />
        </div>
      </div>
    </div>
  )
}
