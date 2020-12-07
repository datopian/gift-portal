/**
 * Create card for each datasets.
 * e.g
 * let props = {
 *  logo: '/argentina.svg',
 *  name: 'Daily Treasury Statement (DTS)',
 *   tags: ['Budget', 'FEDERAL','SPENDING','TAG4'],
 *   description: 'CONTENT HERE',
 *   created: '10/03/2019-11/26/2020',
 *   updated: '11/30/2020',
 * }
 * <Card props={props} />
 * @param {*} props 
 * @return JSX
 */
export default function Card({props}){
  return (
    <div className='flex flex-col rounded-lg border-2 w-379.25px h-607.81px shadow-md justify-between p-5 mb-4'>
      <div className='flex flex-row justify-between items-center'>
        <img src={props.logo} alt='next' className='mr-2' />
        <div className='font-lato text-xl'>{props.name}</div>
      </div>
      <div className='grid grid-cols-2 gap-4 font-roboto text-portal1'>
        {props.tags.map((value,index)=>{
          return <div key={index} className='border-2 text-center rounded-lg'>{value}</div>
        })} 
      </div>
      <div className='font-karla'>
        {props.description}
      </div>
      <div className='pl-3 flex flex-col font-karla'>
        <div className='flex flex-row mb-4'>
        <img src='/calender.svg' alt='next' className='mr-4'/>
        <span>{props.created}</span>
      </div>
      <div className='flex flex-row mb-4'>
        <img src='/check.svg' alt='next' className='mr-4'/>
        <span>Last updated {props.updated}</span>
      </div>
      <div className='flex flex-row mb-4'>
        <img src='/csv.svg' alt='next' className='mr-5'/>
        <div className='self-start'>CSV, JSON, XML</div>
      </div>
      </div>
      
      <div className='flex flex-row justify-between font-karla text-portal1'>
        <span>VIEW DATASET DETAILS</span>
        <img src='/share.svg' alt='next' />
      </div>
    </div>
  );
}