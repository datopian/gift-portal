/* eslint-disable max-len */
import React from 'react'
export default function Navbar() {
  return (
    <div className="flex h-163 w-1440 justify-between bg-portal1">
      <div className="flex flex-row justify-center items-center pt-2 pl-5 pr-5 pb-2 w-1/6 ml-1 bg-portal6 max-w-max">
        <img src="/gift.png" alt="next" />
      </div>
      <div className="flex flex-col justify-center items-center w-1/2 bg-portal1 space-y-6">
        <h2 className="font-lato text-portal5 text-5xl leading-12 h-37 tracking-normal">
          Data Portal
        </h2>
        <div className="bg-portal6 w-full bg-opacity-75 h-24"></div>
      </div>
      <div className="flex flex-col justify-center w-1/6 bg-portal2 items-center pt-3 pb-3 space-y-6 transition duration-500 ease-in-out hover:bg-portal8">
        <img src="/search.svg" alt="next" width="37" height="37" />
        <div className="text-center bg-portal6 w-full bg-opacity-75 h-24">
          <h6><a className="hover:underline" href="#">Search datasets</a></h6>{' '}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-1/6 bg-portal3 pt-3 pb-3 space-y-6 transition duration-500 ease-in-out hover:bg-portal9">
        <img src="/website.svg" alt="next" width="37" height="37" />
        <div className="text-center bg-portal6 w-full bg-opacity-75 h-24">
          <h6><a className="hover:underline" href="http://www.fiscaltransparency.net/">GIFT&apos;s website</a></h6>{' '}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-1/6 bg-portal4 pt-3 pb-3 space-y-6 transition duration-500 ease-in-out hover:bg-portal10">
        <img src="/mail.svg" alt="next" width="48" height="37" />
        <div className="text-center bg-portal6 w-full bg-opacity-75 h-24">
          <h6><a className="hover:underline" href="maito:info@fiscaltransparency.net">Contact us</a></h6>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-1/6 bg-portal5 -pt-3 space-y-6 transition duration-500 ease-in-out hover:bg-portal11 mr-1">
        <img src="/about.svg" alt="next" width="14" height="37" />

        <div className="text-center bg-portal6 w-full bg-opacity-75 h-24">
          <h6><a className="hover:underline" href="#">About us</a></h6>
        </div>
      </div>
    </div>
  )
}
