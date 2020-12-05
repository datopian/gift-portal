export default function Navbar() {

  return (
    <div className='flex  h-163 w-1440 justify-between'>
      <div className='flex flex-row justify-center items-center pt-3 pb-3 w-1/3'>
        <img src='/gift.svg' alt='next' />
      </div>
      <div className='flex flex-col justify-center items-center w-1/2 bg-portal1 space-y-6'>
        <h2 className='font-lato text-white font-bold text-lg leading-10'>Data Portal</h2>
        <div className='bg-portal6 h-6 w-full'></div>
      </div>
      <div className='flex flex-col justify-center w-1/4 bg-portal2 items-center pt-3 pb-3 space-y-6'>
        {/* <div className='border-2 border-blue-500 mb-10 pl-30'><img src='/search.svg' alt='next' /></div> */}
        <img src='/search.svg' alt='next' />
        <div className='text-center bg-portal6 w-full'><h6>search datasets</h6> </div>
      </div>
      <div className='flex flex-col justify-center items-center w-1/3 bg-portal3 pt-3 pb-3 space-y-6'>
        <img src='/website.svg' alt='next' width='37' height='37'/>
        <div className='text-center bg-portal6 w-full'><h6>GIFT's website</h6> </div>
      </div>
      <div className='flex flex-col justify-center items-center w-1/3 bg-portal4 pt-3 pb-3 space-y-6'>
        <img src='/msg.svg' alt='next' width='37' height='37' />
        <div className='text-center bg-portal6 w-full'><h6>Contact us</h6></div>
      </div>
      <div className='flex flex-col justify-center items-center  w-1/4 bg-portal5 -pt-3 space-y-6'>
        <img src='/about.svg' alt='next' width='37' height='37'/>
        <div className='text-center bg-portal6 w-full'><h6>About us </h6></div>
      </div>
    </div>
  );
}