import * as Data  from '../data';
import Card from '../components/Card';

export default function Home() {
  
  let props = {
    logo: '/argentina.svg',
    name: 'Daily Treasury Statement (DTS)',
    tags: ['Budget', 'FEDERAL','SPENDING','TAG4'],
    description: 'CONTENT HERE',
    created: '10/03/2019-11/26/2020',
    updated: '11/30/2020',
  }
  return (
    
      <Card props={props}/>

  )
}