import * as Data  from '../data';
import Card from '../components/Card';
import Search from '../components/Search';
import Fuse from 'fuse.js'
import { useState } from 'react';

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
    if(i % 2===0){
      let g = {...props, tags: props.tags.slice(0,2), name:'Paruguay Dataset'}
      data.push(g);
    }else{
      data.push(props);
    }
    
  }
  const [state, setstate] = useState(data);

  const fuse = new Fuse(data, {
    keys: ['name', 'tags'] 
  });
  
  const handlSearch = function(keyword){
      let data = fuse.search(keyword);
      data = data.map((value)=>{
          let {item} = value;
          return item;
      })
      setstate(data);
  }

  return (  
        <div className='pl-40 pr-40 pt-10 pb-10'>
          <h3 className='font-lato text-xl text-black'>DataSet</h3>
          <div className='flex flex-row justify-between mt-10'>
            <Search  submbitEvent={handlSearch}/>
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
              {state.map((value,i) => {
                return <Card props={value} key={i}/>
              })}
            </div>
          </div>
        </div>      

  )
}