import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import dynamic from "next/dynamic"

// components
import IpForm from '../components/IpForm/IpForm'
import Head from 'next/head'
import Board from '../components/Board/Board'
import Menu from '../components/Menu/Menu';
const Map = dynamic(() => import("../components/Map/Map"), { ssr:false })


export default function HomePage() { 
  const { data: session, status } = useSession()
  const coords = useSelector(state => state.coords);
  const router = useRouter()
  const [userId, setUserId] = useState(null);
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    console.log(status);
    if (status !== 'authenticated') {
      router.replace('/auth');
    }
    if (status === 'authenticated') {
      setUserId(session.user.name)
    }
  }, [])

  return (
   <>
      <Head>
          <title>IP Adress Tracker | Home</title>
      </Head>
      <main className='ip-tracker'>
          <div className='ip-tracker__header'>
            <Menu userId={userId} />
            <IpForm />
            <Board ipData={coords} />
          </div>
          <Map data={coords} />
      </main>
    </>
  )
}
