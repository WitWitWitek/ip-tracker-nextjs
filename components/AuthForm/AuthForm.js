import { useRef, useEffect } from "react"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function AuthForm() {
    const { data: session, status } = useSession()
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const router = useRouter()

    const SubmitHandler = async e => {
        e.preventDefault()
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;    

        const userLoggedIn = await signIn('credentials', {
            redirect: false,
            email: enteredEmail,
            password: enteredPassword
        })
    }

    useEffect(() => {
      if (status === 'authenticated') {
        router.push('/')
      }
    }, [status])
    

    return (
        <section className="auth-form">
           <div className="auth-form__container">
                <h1>Login to IP Tracker</h1>
                <form onSubmit={SubmitHandler}>
                    <div className="auth-form__form-group">
                        <label htmlFor="email" className="auth-form__form-label">Email</label>
                        <input className="auth-form__form-input" type="email" id="email"  ref={emailInputRef} />
                    </div>
                    <div className="auth-form__form-group">
                        <label htmlFor="password" className="auth-form__form-label">Password</label>
                        <input className="auth-form__form-input" type="password" id="password" ref={passwordInputRef} />
                    </div>
                    <div>
                        <button className="auth-form__form-button" type="submit">Submit</button>
                    </div>
                </form>
           </div>
        </section>
    )
}
