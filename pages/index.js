// import styles from '../styles/Home.module.css'
import * as Data  from '../data';

export default function Home() {
  
  return (
    <div >
      <h1 className='text-blue-600'>GIFT Data Portal</h1>
      <p>{Data.data[0]}</p>
    </div>
  )
}
