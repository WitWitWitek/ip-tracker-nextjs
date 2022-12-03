import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export const useSignIn = () => {
    const [signInError, setSignInError] = useState(null);
    const [signInSuccess, setSignInSuccess] = useState(null);
    const router = useRouter();
    
    const signInHandler = async (enteredEmail, enteredPassword) => {
        setSignInError(null)
        setSignInSuccess(null)
        try {
            const userLoggedIn = await signIn('credentials', {
                redirect: false,
                email: enteredEmail,
                password: enteredPassword
            })
            if (!userLoggedIn.ok) throw new Error(userLoggedIn.error);
            setSignInSuccess('User logged in.')
            router.replace('/');
        } catch (err) {
            setSignInError(err.message);
        }
    }

    return {
        signInError,
        signInSuccess,
        signInHandler
    }
}
