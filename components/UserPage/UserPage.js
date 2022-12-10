import { useSession } from 'next-auth/react';
import { useEffect, useState} from 'react';
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import IpItemsList from "../IpItemsList/IpList";
import Alert from '../Alert/Alert';

export default function UserPage({username}) {
  const [isFormOpen, setFormOpen] = useState(false);
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth')
    }
  }, [status, router])

  return (
    <section className="ip-tracker__user-page">
        <h1>{`Welcome to your profile page ${username}`}</h1>
        <div className="ip-tracker__user-page-menu">
          <button className="ip-tracker__user-page-menu-btn" onClick={() => router.push('/')}>Back to map</button>
          <button className="ip-tracker__user-page-menu-btn" onClick={() => setFormOpen(prevState => !prevState)}>Change password</button>
          <button className="ip-tracker__user-page-menu-btn" onClick={() => signOut({redirect: true, callbackUrl: '/auth'})}>Log out</button>
        </div>
        {isFormOpen && (
          <div className="ip-tracker__user-page-form-wrapper">
            <ChangePasswordForm />
          </div>
        )}
        <Alert />
        <IpItemsList />
    </section>
  )
}
