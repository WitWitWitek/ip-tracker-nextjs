import { useRef, useEffect } from "react"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from "react"
import { createUser } from "../../lib/createUser"

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState(null)
    const [userCreated, setUserCreaed] = useState(null)

    const { data: session, status } = useSession()
    const router = useRouter()

    const usernameInputRef = useRef()
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    

    const switchAuthFormHandler = () => setIsLogin(prevMode => !prevMode)

    const SubmitHandler = async e => {
        e.preventDefault()
        setUserCreaed(null)
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;    

        if (isLogin) {
            const userLoggedIn = await signIn('credentials', {
                redirect: false,
                email: enteredEmail,
                password: enteredPassword
            })
        } else {
            const enteredUsername = usernameInputRef.current.value;
            try {
                setError(null);
                const result = await createUser(
                    enteredUsername, enteredEmail, enteredPassword
                )
                if (result) {
                    setIsLogin(true)
                    setUserCreaed(result.message)
                }
            } catch (err) {
                setError(err.message || 'Something went wrong.');
            }
            usernameInputRef.current.value = ''
        }

        emailInputRef.current.value = ''
        passwordInputRef.current.value = ''
    }

    useEffect(() => {
      if (status === 'authenticated') {
        router.push('/')
      }
    }, [status])
    

    const authFormClass = `auth-form__form-input ${error ? 'error' : ''}`

    return (
        <section className="auth-form">
           <div className="auth-form__container">
                <h1>{`${isLogin ? 'Login' : 'Sign up'}  to IP Tracker`}</h1>
                <form onSubmit={SubmitHandler}>
                    {!isLogin && (
                    <div className="auth-form__form-group">
                        <label htmlFor="username" className="auth-form__form-label">Username</label>
                        <input className={authFormClass} type="name" id="username"  ref={usernameInputRef} />
                    </div>
                    )}
                    <div className="auth-form__form-group">
                        <label htmlFor="email" className="auth-form__form-label">Email</label>
                        <input className={authFormClass} type="email" id="email"  ref={emailInputRef} />
                    </div>
                    <div className="auth-form__form-group">
                        <label htmlFor="password" className="auth-form__form-label">Password</label>
                        <input className={authFormClass} type="password" id="password" ref={passwordInputRef} />
                    </div>
                    <div>
                        <button className="auth-form__form-button" type="submit">Submit</button>
                    </div>
                </form>
                <button 
                    className="auth-form__button" 
                    onClick={switchAuthFormHandler}
                    >
                    {isLogin ? 'Create new account' : 'Login with existing account'}          
                </button>
                {error && <p className="ip-tracker-error-text">{error}</p>}
                {userCreated && <p style={{textAlign: 'center'}}>{userCreated}</p>}
           </div>
        </section>
    )
}
