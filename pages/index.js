import styles from '../styles/Home.module.scss'

// components
import IpForm from '../components/IpForm/IpForm'

import Head from 'next/head'
export default function Home() { 
  return (
   <>
    <Head>
        
    </Head>
    <div className={styles.container}>
        <IpForm />
    </div>
    </>
  )
}

// export async function getStaticProps() {
//   // env.local.GEO_API_KEY
// }
