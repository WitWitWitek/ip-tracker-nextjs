import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import IpItemsList from "../IpItemsList/IpList";

export default function UserPage({username, ipData}) {
  const [isFormOpen, setFormOpen] = useState(false);
  const router = useRouter()
  
  return (
    <section className="ip-tracker__user-page">
        <h1>{`Welcome to your profile page ${username}`}</h1>
        <div className="ip-tracker__user-page-menu">
          <button className="ip-tracker__user-page-menu-btn" onClick={() => router.push('/')}>Back to map</button>
          <button className="ip-tracker__user-page-menu-btn" onClick={() => setFormOpen(prevState => !prevState)}>Change password</button>
          <button className="ip-tracker__user-page-menu-btn" onClick={() => signOut()}>Log out</button>
        </div>
        {isFormOpen && (
          <div className="ip-tracker__user-page-form-wrapper">
            <ChangePasswordForm />
          </div>
        )}
        <IpItemsList ipData={ipData} />
    </section>
  )
}
