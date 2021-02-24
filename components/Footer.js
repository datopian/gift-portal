/* eslint-disable max-len */
import React from 'react'


export default function Footer() {
  return (
    <div className='flex flex-col h-200px justify-center w-1440 items-center content-between bg-portal7 text-portal5 font-lato mr-0 ml-0 p-8 text-center'>
      <div className='mb-10'>Get in touch</div>
      <div className='flex flex-row justify-between items-center mb-10'>
        {/* <img src='/ig.svg' alt='next'  className='mr-12 fill-current text-green-600'/> */}

        {/* Instagram icon */}
        <a href='https://www.instagram.com/fiscaltransparency'>
          <svg
            width='25'
            height='25'
            className='mr-12 fill-current text-portal2 footerIcon'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M12.377 5.849a6.146 6.146 0 00-6.155 6.155 6.146 6.146 0 006.155 6.155 6.146 6.146 0 006.156-6.155 6.146 6.146 0 00-6.156-6.155zm0 10.157a4.01 4.01 0 01-4.001-4.002 4.006 4.006 0 014.002-4.002 4.006 4.006 0 014.001 4.002c0 2.207-1.8 4.002-4.002 4.002zm7.843-10.41c0 .8-.642 1.437-1.435 1.437a1.436 1.436 0 111.436-1.436zm4.077 1.458c-.09-1.923-.53-3.627-1.94-5.03C20.955.62 19.252.18 17.328.084c-1.982-.112-7.923-.112-9.905 0-1.918.091-3.621.53-5.03 1.934C.982 3.422.549 5.125.452 7.048c-.112 1.983-.112 7.924 0 9.906.092 1.923.53 3.627 1.94 5.03 1.409 1.404 3.107 1.843 5.03 1.94 1.982.112 7.923.112 9.905 0 1.924-.091 3.627-.53 5.03-1.94 1.405-1.403 1.844-3.107 1.94-5.03.113-1.982.113-7.918 0-9.9zm-2.56 12.027a4.051 4.051 0 01-2.283 2.282c-1.58.627-5.33.482-7.077.482-1.746 0-5.501.14-7.076-.482a4.051 4.051 0 01-2.282-2.282c-.627-1.58-.483-5.33-.483-7.077 0-1.746-.139-5.502.483-7.077A4.051 4.051 0 015.3 2.645c1.58-.627 5.33-.482 7.076-.482 1.747 0 5.502-.14 7.077.482a4.052 4.052 0 012.282 2.282c.627 1.58.483 5.33.483 7.077 0 1.746.144 5.502-.483 7.077z' />
          </svg>
        </a>

        {/* Twitter icon */}
        <a href='https://twitter.com/Fiscaltrans'>
          <svg
            width='25'
            className='mr-12 fill-current text-portal2 footerIcon'
            height='20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M21.915 5.116c.015.213.015.426.015.64 0 6.502-4.95 13.994-13.995 13.994a13.9 13.9 0 01-7.553-2.208c.396.046.776.061 1.188.061 2.3 0 4.416-.777 6.106-2.102a4.928 4.928 0 01-4.599-3.41c.305.045.61.075.93.075A5.2 5.2 0 005.3 12 4.92 4.92 0 011.356 7.17v-.06a4.954 4.954 0 002.224.624 4.915 4.915 0 01-2.193-4.097c0-.913.243-1.75.67-2.482a13.981 13.981 0 0010.142 5.147 5.555 5.555 0 01-.122-1.126 4.917 4.917 0 014.919-4.92c1.416 0 2.695.595 3.594 1.554A9.684 9.684 0 0023.712.623a4.905 4.905 0 01-2.163 2.71 9.86 9.86 0 002.833-.76 10.572 10.572 0 01-2.467 2.543z' />
          </svg>
        </a>

        {/* Facebook icon */}
        <a href='https://www.facebook.com/FiscalTransparency'>
          <svg
            width='24'
            className='mr-12 fill-current text-portal2 footerIcon'
            height='24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M23.632 12.074C23.632 5.652 18.429.45 12.007.45S.382 5.652.382 12.074c0 5.802 4.25 10.612 9.808 11.485v-8.124H7.237v-3.36h2.953V9.512c0-2.913 1.735-4.523 4.391-4.523 1.272 0 2.603.227 2.603.227v2.86h-1.467c-1.443 0-1.894.896-1.894 1.815v2.182h3.224l-.515 3.36h-2.709v8.125c5.558-.873 9.809-5.683 9.809-11.485z' />
          </svg>
        </a>

        {/* Email icon */}
        <a
          href='mailto:info@fiscaltransparency.net'
          target='_blank'
          rel='noreferrer'
        >
          <svg
            width='25'
            className='fill-current text-portal2 footerIcon'
            height='19'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M22.382.004h-19.5a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25h19.5a2.25 2.25 0 002.25-2.25v-13.5a2.25 2.25 0 00-2.25-2.25zm0 2.25v1.913c-1.051.856-2.727 2.186-6.309 4.991-.79.621-2.353 2.113-3.441 2.096-1.088.017-2.652-1.475-3.441-2.096-3.582-2.804-5.258-4.135-6.31-4.991V2.254h19.5zm-19.5 13.5v-8.7A797.56 797.56 0 007.8 10.928c1.024.806 2.819 2.587 4.83 2.576 2.003.01 3.775-1.744 4.831-2.576a794.52 794.52 0 004.92-3.874v8.7h-19.5z' />
          </svg>
        </a>
      </div>
      <div>
        Copyright &#169; {new Date().getFullYear()} Global Initiative for Fiscal
        Transparency. All rights reserved.
      </div>
    </div>
  )
}
