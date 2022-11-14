import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import IpItemsList from "../IpItemsList/IpList";

export default function UserPage({username, ipData}) {
  const router = useRouter()
  
  return (
    <section className="ip-tracker__user-page">
        <h1>{`Welcome to your profile page ${username}`}</h1>
        <button onClick={() => router.push('/')}>Back to map</button>
        <button onClick={() => signOut()}>Log out</button>
        <IpItemsList ipData={ipData} />
        <ChangePasswordForm />
    </section>
  )
}
