import Card from '../components/Card';
import Footer from '../components/Footer';
import Search from '../components/Search';
import Navbar from '../components/Navbar';

export default function Home() {
   const props = {
    logo: '/argentina.svg',
    name: 'Daily Treasury Statement (DTS)',
    tags: ['Budget', 'FEDERAL','SPENDING','TAG4'],
    description: 'CONTENT HERE',
    created: '10/03/2019-11/26/2020',
    updated: '11/30/2020',
  }
  let data = [];
  for(let i=0; i < 8; i++){
    data.push(props);
  }
  return (
      <div>
        <Navbar />
        <div className='pl-40 pr-40 pt-10 pb-10'>
          <h3 className='font-lato text-xl text-black'>DataSet</h3>
          <div className='flex flex-row justify-between mt-10'>
            <Search />
            <div className='flex justify-between items-center mr-35 pr-9'>
              <h3 className="mr-4">Sort by: </h3>
              <select id="cars" className='border-2 focus:outline-none bg-white font-karla h-72px w-545px font-karla rounded-md'>
                <option value="AZ">Alphabetical Ascending (A to Z)   </option>
                <option value="ZA">Alphabetical Descending (Z to A)  </option>
              </select>
            </div>
          </div>
          <div className='mt-10'>
            <div className='mb-10'>showing 6 of 6 dataset</div>
            <div className='grid grid-cols-3 gap-x-40 gap-y-10'>
              {data.map((value,i) => {
                return <Card props={value} key={i}/>
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      

  )
}