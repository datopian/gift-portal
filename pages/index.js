import styles from '../styles/Home.module.css'
import * as Data  from '../data';

export default function Home() {
  
  return (
    <div className={styles.container}>
      <h1>GIFT Data Portal</h1>
      <p>{Data.data[0]}</p>
    </div>
  )
}
