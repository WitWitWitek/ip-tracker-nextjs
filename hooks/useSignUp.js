import { useState } from "react";

export const useSignUp = () => {
    const [signUpError, setSignUpError] = useState(null);
    const [signUpSuccess, setSignUpSuccess] = useState(null);
    
    const signUpHandler = async (username, email, password) => {
        setSignUpError(null)
        setSignUpSuccess(null)
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: {
                  'Content-Type': 'application/json',
                },
              });
            
              const { message } = await response.json();
              if (!response.ok) {
                throw new Error(message || 'Something went wrong!');
              }
              setSignUpSuccess(message)
        } catch (err) {
            setSignUpError(err.message);
        }
    }

    return {
        signUpError,
        signUpSuccess,
        signUpHandler
    }
}