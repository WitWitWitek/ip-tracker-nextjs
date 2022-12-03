import { useRef } from "react"
import { useState } from "react"
import { useSignIn } from "../../hooks/useSignIn"
import { useSignUp } from '../../hooks/useSignUp'

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState(null)
    useSignUp
    const { signInError, signInSuccess, signInHandler } = useSignIn()
    const { signUpError, signUpSuccess, signUpHandler} = useSignUp()
    const usernameInputRef = useRef()
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    

    const switchAuthFormHandler = () => setIsLogin(prevMode => !prevMode)

    const submitHandler = async e => {
        e.preventDefault()
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;    
        
        if (isLogin) {
            await signInHandler(enteredEmail, enteredPassword);
        } else {
            const enteredUsername = usernameInputRef.current.value;
            await signUpHandler(enteredUsername, enteredEmail, enteredPassword)
            usernameInputRef.current.value = ''
        }
        emailInputRef.current.value = ''
        passwordInputRef.current.value = ''
    }

    const authFormClass = `auth-form__form-input ${(signInError && isLogin) || (signUpError && !isLogin) ? 'input-error' : ''}`

    return (
        <section className="auth-form">
           <div className="auth-form__container">
                <h1>{`${isLogin ? 'Login' : 'Sign up'}  to IP Tracker`}</h1>
                <form onSubmit={submitHandler}>
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
                {signInError && isLogin && <p className="auth-form__auth-error">{signInError}</p>}
                {signUpError && !isLogin && <p className="auth-form__auth-error">{signUpError}</p>}
                {signInSuccess && isLogin && <p className="auth-form__auth-success">{signInSuccess}</p>}
                {signUpSuccess && !isLogin && <p className="auth-form__auth-success">{signUpSuccess}</p>}
           </div>
        </section>
    )
}
