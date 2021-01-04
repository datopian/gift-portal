/* eslint-disable max-len */
import React from 'react'
export default function Navbar() {
  return (
    <div className="flex  h-163 w-1440 justify-between">
      <div className="flex flex-row justify-center items-center pt-2 pb-2 w-1/6">
        <img src="/gift.svg" alt="next" />
      </div>
      <div className="flex flex-col justify-center items-center w-1/2 bg-portal1 space-y-6">
        <h2 className="font-lato text-white font-bold text-2xl leading-9 h-37 tracking-wide">
          Data Portal
        </h2>
        <div className="bg-portal6 h-24 w-full bg-opacity-75"></div>
      </div>
      <div className="flex flex-col justify-center w-1/6 bg-portal2 items-center pt-3 pb-3 space-y-6 hover:bg-portal8">
        {/* <div className='border-2 border-blue-500 mb-10 pl-30'><img src='/search.svg' alt='next' /></div> */}
        <svg
          width="37"
          height="37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26 23h-1.58l-.56-.54C25.82 20.18 27 17.22 27 14c0-7.18-5.82-13-13-13S1 6.82 1 14s5.82 13 13 13c3.22 0 6.18-1.18 8.46-3.14l.54.56V26l10 9.98L35.98 33 26 23zm-12 0c-4.98 0-9-4.02-9-9s4.02-9 9-9 9 4.02 9 9-4.02 9-9 9z"
            fill="#fff"
          />
          <path
            d="M26 23l.354-.353-.147-.147H26v.5zm-1.58 0l-.347.36.145.14h.202V23zm-.56-.54l-.38-.326-.307.358.34.328.347-.36zm-1.4 1.4l.36-.347-.328-.34-.358.308.326.379zm.54.56h.5v-.202l-.14-.145-.36.347zM23 26h-.5v.207l.147.147L23 26zm10 9.98l-.353.354.353.353.354-.353L33 35.98zM35.98 33l.354.354.353-.354-.353-.353-.354.353zM26 22.5h-1.58v1H26v-1zm-1.233.14l-.56-.54-.694.72.56.54.694-.72zm-.528.146A13.443 13.443 0 0027.5 14h-1c0 3.096-1.134 5.941-3.02 8.134l.76.652zM27.5 14C27.5 6.544 21.456.5 14 .5v1c6.904 0 12.5 5.596 12.5 12.5h1zM14 .5C6.544.5.5 6.544.5 14h1C1.5 7.096 7.096 1.5 14 1.5v-1zM.5 14c0 7.456 6.044 13.5 13.5 13.5v-1C7.096 26.5 1.5 20.904 1.5 14h-1zM14 27.5c3.344 0 6.419-1.226 8.786-3.26l-.652-.76A12.442 12.442 0 0114 26.5v1zm8.1-3.293l.54.56.72-.694-.54-.56-.72.694zm.4.213V26h1v-1.58h-1zm.147 1.934l10 9.98.706-.708-10-9.98-.706.708zm10.707 9.98l2.98-2.98-.708-.708-2.98 2.98.708.708zm2.98-3.687l-9.98-10-.708.706 9.98 10 .708-.706zM14 22.5A8.488 8.488 0 015.5 14h-1c0 5.256 4.244 9.5 9.5 9.5v-1zM5.5 14c0-4.704 3.796-8.5 8.5-8.5v-1A9.488 9.488 0 004.5 14h1zM14 5.5c4.704 0 8.5 3.796 8.5 8.5h1c0-5.256-4.244-9.5-9.5-9.5v1zm8.5 8.5c0 4.704-3.796 8.5-8.5 8.5v1c5.256 0 9.5-4.244 9.5-9.5h-1z"
            fill="#4D5858"
          />
        </svg>
        <div className="text-center bg-portal6 w-full bg-opacity-75">
          <h6>search datasets</h6>{' '}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-1/6 bg-portal3 pt-3 pb-3 space-y-6 hover:portal9">
        <img src="/website.svg" alt="next" width="37" height="37" />
        <div className="text-center bg-portal6 w-full bg-opacity-75">
          <h6>GIFT&apos;s website</h6>{' '}
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-1/6 bg-portal4 pt-3 pb-3 space-y-6 hover:portal10">
        <svg
          width="48"
          height="37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M44 4.5V4H4V8.563l.184.15c2.107 1.716 5.462 4.38 12.625 9.99.245.192.542.44.876.718.682.57 1.515 1.264 2.358 1.868.639.458 1.31.885 1.972 1.197.654.309 1.335.522 1.985.514.65.008 1.33-.205 1.985-.514.662-.312 1.333-.74 1.971-1.197.844-.604 1.677-1.299 2.359-1.867.333-.279.631-.527.876-.72 7.164-5.61 10.519-8.274 12.625-9.989l.184-.15V4.5zm-40 27v.5h40V13.062l-.812.647c-2.146 1.71-5.192 4.11-9.835 7.746h-.001a50.45 50.45 0 00-1.031.844c-.886.737-1.904 1.584-3.055 2.34-1.618 1.06-3.405 1.871-5.263 1.86h-.006c-1.867.011-3.67-.812-5.294-1.88-1.154-.759-2.169-1.605-3.041-2.332a47.97 47.97 0 00-1.015-.832h0a1597.942 1597.942 0 01-9.835-7.746L4 13.062V31.5zm.5-31h39a4 4 0 014 4v27a4 4 0 01-4 4h-39a4 4 0 01-4-4v-27a4 4 0 014-4z"
            fill="#fff"
            fillOpacity=".87"
            stroke="#4D5858"
          />
        </svg>
        <div className="text-center bg-portal6 w-full bg-opacity-75">
          <h6>Contact us</h6>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center  w-1/6 bg-portal5 -pt-3 space-y-6 hover:portal11">
        <svg
          width="37"
          height="37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.75 40.272h.5V25.729H1.875c-.76 0-1.375-.616-1.375-1.375v-4.479c0-.76.616-1.375 1.375-1.375h10.5c.76 0 1.375.616 1.375 1.375v20.397h2.375c.76 0 1.375.615 1.375 1.375v4.478c0 .76-.616 1.375-1.375 1.375H1.875C1.115 47.5.5 46.884.5 46.125v-4.478c0-.76.616-1.375 1.375-1.375H3.75zm-1-33.522a6.25 6.25 0 1112.5 0 6.25 6.25 0 01-12.5 0z"
            fill="#fff"
            fillOpacity=".87"
            stroke="#4D5858"
          />
        </svg>

        <div className="text-center bg-portal6 w-full bg-opacity-75">
          <h6>About us </h6>
        </div>
      </div>
    </div>
  )
}
