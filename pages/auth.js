import AuthForm from "../components/AuthForm/AuthForm";
import Head from 'next/head'

export default function auth() {
  return (
    <>
        <Head>
            <title>IP Adress Tracker | Sign in</title>
        </Head>
        <AuthForm />
    </>
    
  )
}
