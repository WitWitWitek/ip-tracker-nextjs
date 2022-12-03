import { useState } from "react";

export const useChangePassword = () => {
    const [changePasswordError, setChangePasswordError] = useState(null);
    const [changePasswordSuccess, setChangePasswordSuccess] = useState(null);
    
    const changePasswordHandler = async (enteredOldPassword, enteredNewPassword, enteredNewPasswordRepeat) => {
        setChangePasswordError(null)
        setChangePasswordSuccess(null)
        try {
            if (!enteredOldPassword || !enteredNewPassword || !enteredNewPasswordRepeat) {
                throw new Error('Fill in all of the inputs.');
            }
            if (enteredNewPassword !== enteredNewPasswordRepeat) {
                throw new Error('New passwords mismatch.');
            }
            const passwordData = {
                oldPassword: enteredOldPassword,
                newPassword: enteredNewPassword 
            }
            const passwordChangeResponse = await fetch('/api/user/change-password', {
                method: 'PATCH',
                body: JSON.stringify(passwordData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const { message } = await passwordChangeResponse.json()
            if (!passwordChangeResponse.ok) {
                throw new Error(message)
            }
            setChangePasswordSuccess(message)
        } catch (err) {
            setChangePasswordError(err.message);
        }
    }

    return {
        changePasswordSuccess,
        changePasswordError,
        changePasswordHandler
    }
}