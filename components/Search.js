export default function Search(){
 
  return (
    <div className='h-72px w-545px border-2 flex justify-between p-2 rounded-md font-karla'>
      <input type='text' placeholder='Search for dataset by keyword..' size='50' className='focus:outline-none'/>
      <button className='focus:outline-none'><img src="/search2.svg" /></button>
    </div>
  );
}