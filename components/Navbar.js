/* eslint-disable max-len */
import React from 'react'
export default function Navbar() {
  return (
    <div className="flex justify-between bg-portal1">
      <div className="hidden sm:block flex flex-row justify-center items-center pt-2 pl-5 pr-5 pb-2 w-1/6 ml-1 bg-portal6 max-w-max">
        <a href="http://www.fiscaltransparency.net/">
          <img src="/gift.png" alt="next" />
        </a>
      </div>
      <div className="flex flex-col justify-center items-center w-1/3 md:w-1/6 lg:w-1/3 xl:w-1/2 bg-portal1 space-y-6">
        <h2 className="font-lato text-portal5 text-lg md:leading-0 md: pt-0 md:text-4xl md:text-center lg:leading-12 lg:text-5xl lg:h-37 lg:max-h-37 tracking-normal">
          <a href="/">Data Portal</a>
        </h2>
        <div className="hidden bg-portal6 w-full bg-opacity-75 h-24 lg:flex"></div>
      </div>
      <div className="flex flex-col justify-center w-1/6 md:w-1/5 lg:w-1/6 bg-portal2 items-center space-y-6 transition duration-500 ease-in-out hover:bg-portal8 pb-3 pt-3">
        <a href="/">
          <img src="/search.svg" alt="next" width="37" height="37" />
        </a>
        <div className="hidden text-center bg-portal6 w-full bg-opacity-75 md:block h-24 lg:pb-0 2xl:text-xl">
          <h6>
            <a className="hover:underline" href="/">
              Search datasets
            </a>
          </h6>{' '}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-1/6 bg-portal3 space-y-6 transition duration-500 ease-in-out hover:bg-portal9 pb-3 pt-3">
        <a href="http://www.fiscaltransparency.net/">
          <img src="/website.svg" alt="next" width="37" height="37" />
        </a>
        <div className="hidden text-center bg-portal6 w-full bg-opacity-75 md:block h-24 lg:pb-0 2xl:text-xl">
          <h6>
            <a
              className="hover:underline"
              href="http://www.fiscaltransparency.net/"
            >
              GIFT&apos;s website
            </a>
          </h6>{' '}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-1/6 bg-portal4 space-y-6 transition duration-500 ease-in-out hover:bg-portal10 pb-3 pt-3 2xl:text-xl">
        <a className="hover:underline" href="maito:info@fiscaltransparency.net">
          <img src="/mail.svg" alt="next" width="48" height="37" />
        </a>
        <div className="hidden text-center bg-portal6 w-full bg-opacity-75 md:block h-24 lg:pb-0">
          <h6>
            <a
              className="hover:underline"
              href="maito:info@fiscaltransparency.net"
            >
              Contact us
            </a>
          </h6>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-1/6 bg-portal5 space-y-6 transition duration-500 ease-in-out hover:bg-portal11 pb-3 pt-3 2xl:text-xl">
        <a className="hover:underline" href="#">
          <img src="/about.svg" alt="next" width="13.88" height="37" />
        </a>
        <div className="hidden text-center bg-portal6 w-full bg-opacity-75 md:block h-24 lg:pb-0">
          <h6>
            <a className="hover:underline" href="#">
              About us
            </a>
          </h6>
        </div>
      </div>
    </div>
  )
}
