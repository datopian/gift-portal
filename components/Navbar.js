/* eslint-disable max-len */
import React from 'react'
import { useSession, signOut, signIn } from 'next-auth/client'

export default function Navbar() {
  const [session] = useSession()

  return (
    <div className='flex justify-between bg-portal1 shadow'>
      <div className='flex flex-row flex-wrap w-1/6 gap-y-0 md:gap-y-2 lg:w-1/6 lg:gap-y-0 xl:w-1/2 text-center items-center md:self-start sm:bg-portal6 md:bg-portal1 xl:grid-cols-2'>
        <div className='hidden sm:block justify-center items-center m-0 bg-portal6'>
          <a href='/'>
            <img
              src='/gift.png'
              alt='next'
              className='p-1 lg:p-4 max-h-150px'
            />
          </a>
        </div>
        <div className='bg-portal1 flex flex-grow justify-center'>
          <h2 className='p-1 mt-0 pt-0 xl:p-0 font-lato text-portal5 text-sm sm:text-base md:text-lg lg:text-xl tracking-wide xl:text-3xl 2xl:text-4xl xl:text-left xl:pl-4 2xl:pl-0'>
            <a href='/'>Data Portal</a>
          </h2>
        </div>
      </div>
      <div className='flex flex-col justify-center w-1/6 pb-3 pt-3 md:w-1/5 lg:w-1/6 bg-portal2 items-center space-y-6 transition duration-500 ease-in-out hover:bg-portal8 lg:p-0'>
        <div className='px-4 py-2 sm:px-6'>
          <a href='/'>
            <img src='/home.svg' alt='next' width='37' height='37' />
          </a>
        </div>
        <div className='hidden text-center bg-portal6 w-full bg-opacity-75 md:block h-26 lg:pb-0 2xl:text-lg shadow border-t border-b border-footer'>
          <h6>
            <a href='/'>Home</a>
          </h6>{' '}
        </div>
      </div>
      <div className='flex flex-col justify-center items-center w-1/6 bg-portal3 space-y-6 transition duration-500 ease-in-out hover:bg-portal9 pb-3 pt-3'>
        <div className='px-4 py-2 sm:px-6'>
          <a href='http://www.fiscaltransparency.net/'>
            <img src='/website.svg' alt='next' width='37' height='37' />
          </a>
        </div>
        <div className='hidden text-center bg-portal6 w-full bg-opacity-75 md:block h-26 lg:pb-0 2xl:text-lg shadow border-t border-b border-footer'>
          <h6>
            <a href='http://www.fiscaltransparency.net/'>GIFT&apos;s website</a>
          </h6>{' '}
        </div>
      </div>
      <div className='flex flex-col justify-center items-center w-1/6 bg-portal4 space-y-6 transition duration-500 ease-in-out hover:bg-portal10 pb-3 pt-3 2xl:text-lg'>
        <div className='px-4 py-2 sm:px-6'>
          <a
            href='mailto:info@fiscaltransparency.net'
            target='_blank'
            rel='noreferrer'
          >
            <img src='/mail.svg' alt='next' width='37' height='37' />
          </a>
        </div>
        <div className='hidden text-center bg-portal6 w-full bg-opacity-75 md:block h-26 lg:pb-0 shadow border-t border-b border-footer'>
          <h6>
            <a
              href='mailto:info@fiscaltransparency.net'
              target='_blank'
              rel='noreferrer'
            >
              Contact us
            </a>
          </h6>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center w-1/6 bg-portal5 space-y-6 transition duration-500 ease-in-out hover:bg-portal11 pb-3 pt-3 2xl:text-lg'>
        <div className='px-6 py-0 md:py-2 sm:px-9'>
          <a href='#'>
            <img src='/about.svg' alt='next' width='37' height='37' />
          </a>
        </div>
        <div className='hidden text-center bg-portal6 w-full bg-opacity-75 md:block h-26 lg:pb-0 shadow border-t border-b border-footer'>
          <h6>
            <a href='/about'>About us</a>
          </h6>
        </div>
      </div>
      <div className='flex flex-col justify-center w-1/6 pb-3 pt-3 md:w-1/5 lg:w-1/6 bg-tertiary items-center space-y-6 transition duration-500 ease-in-out hover:bg-tertiaryHover lg:p-0'>
        {!session ? (
          <>
            <div className='px-4 py-2 sm:px-6'>
              <a href='/'>
                <img src='/login.svg' alt='next' width='47.7548' height='37' />
              </a>
            </div>
            <div className='hidden text-center bg-portal6 w-full bg-opacity-75 md:block h-26 lg:pb-0 2xl:text-lg shadow border-t border-b border-footer'>
              <button 
                onClick={() => {
                  signIn('github', {
                    callbackUrl: '/dashboard',
                    redirect: true
                  })
                }}>
                Login
              </button>
            </div>
          </>
        ) : (
          <>
            <div className='px-4 py-2 sm:px-6'>
              <a href='/dashboard'>
                <img
                  src={session.user.image}
                  alt='next'
                  width='37'
                  height='37'
                  className='profile-img'
                />
              </a>
            </div>
            <div className='hidden text-center bg-portal6 w-full bg-opacity-75 md:block h-26 lg:pb-0 2xl:text-lg shadow border-t border-b border-footer'>
              <button onClick={() => { signOut() }}>
                  Log out
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
