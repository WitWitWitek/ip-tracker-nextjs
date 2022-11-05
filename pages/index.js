import { signOut, useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import dynamic from "next/dynamic"

// components
import IpForm from '../components/IpForm/IpForm'
import Head from 'next/head'
import Board from '../components/Board/Board'
const Map = dynamic(() => import("../components/Map/Map"), { ssr:false })


export default function Home() { 
  const { status } = useSession()
  const coords = useSelector(state => state.coords);
  const router = useRouter()
  
  const logOut = () => signOut()

  useEffect(() => {
    if (status !== 'authenticated') {
      router.replace('/auth')
    }
  }, [status])
  

  return (
   <>
      <Head>
          <title>IP Adress Tracker | Home</title>
      </Head>
      <main className='ip-tracker'>
          <div className='ip-tracker__header'>
            <h1>IP Adress Tracker</h1>
            <button onClick={logOut}>log out</button>
            <IpForm />
            <Board data={coords} />
          </div>
          <Map data={coords} />
      </main>
    </>
  )
}
