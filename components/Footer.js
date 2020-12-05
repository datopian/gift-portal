export default function Footer(){

  return (
    <div className='flex flex-col h-200px justify-center w-1440 items-center content-between border-2 bg-portal7 text-white font-lato'>
      <div className='mb-10'>Get in touch</div>
      <div className='flex flex-row justify-between mb-10'>
        <img src='/ig.svg' alt='next'  className='mr-12'/>
        <img src='/twitter.svg' alt='next' className='mr-12' />
        <img src='/fb.svg' alt='next' className='mr-12'/>
        <img src='/mail.svg' alt='next'/>
      </div>
      <div>Copyright &#169; {new Date(). getFullYear()} Global Initiative for Fiscal Transparency. All rights reserved.</div>
    </div>
  )
}