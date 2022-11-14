import { useRef } from "react"
import { changePasswordHandler } from '../../lib/changePassword'

export default function ChangePasswordForm() {
    const oldPasswordInputRef =  useRef('')
    const newPasswordInputRef =  useRef('')
    const newPasswordRepeatInputRef =  useRef('')

    const formHandler = e => {
        e.preventDefault()
        const enteredOldPassword = oldPasswordInputRef.current.value
        const enteredNewPassword = newPasswordInputRef.current.value
        const enteredNewPasswordRepeat = newPasswordRepeatInputRef.current.value
        
        try {
            if (enteredNewPassword !== enteredNewPasswordRepeat) {
                throw new Error('New passwords mismatch.');
            }
    
            const passwordData = {
                oldPassword: enteredOldPassword,
                newPassword: enteredNewPassword 
            }
    
            changePasswordHandler(passwordData)
        } catch(err) {
            alert(err)
        }
    
        oldPasswordInputRef.current.value = ''
        newPasswordInputRef.current.value = ''
        newPasswordRepeatInputRef.current.value = ''
    }

    const authFormClass = `auth-form__form-input ` //${error ? 'error' : ''}

    return (
           <div className="auth-form__container">
                <form onSubmit={formHandler}>
                        <div className="auth-form__form-group">
                            <label htmlFor="old-password" className="auth-form__form-label">Old password</label>
                            <input className={authFormClass} type="password" id="old-password" ref={oldPasswordInputRef}/>
                        </div>
                        <div className="auth-form__form-group">
                            <label htmlFor="new-password" className="auth-form__form-label">New password</label>
                            <input className={authFormClass} type="password" id="new-password" ref={newPasswordInputRef}/>
                        </div>
                        <div className="auth-form__form-group">
                            <label htmlFor="new-password-repeat" className="auth-form__form-label">Repeat new password</label>
                            <input className={authFormClass} type="password" id="new-password-repeat" ref={newPasswordRepeatInputRef}/>
                        </div>
                        <button className="auth-form__form-button"  type="submit">Change password</button>
                </form>
           </div>
    )
}
