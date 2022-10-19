import { useSelector } from 'react-redux';
import dynamic from "next/dynamic"

// components
import IpForm from '../components/IpForm/IpForm'
import Head from 'next/head'
import Board from '../components/Board/Board'
const Map = dynamic(() => import("../components/Map/Map"), { ssr:false })


export default function Home() { 
  const coords = useSelector(state => state.coords);
  return (
   <>
    <Head>
        <title>IP Adress Tracker | Home</title>
    </Head>
    <main className='ip-tracker'>
        <div className='ip-tracker__header'>
          <h1>IP Adress Tracker</h1>
          <IpForm />
          <Board data={coords} />
        </div>
        <Map data={coords} />
    </main>
    </>
  )
}
