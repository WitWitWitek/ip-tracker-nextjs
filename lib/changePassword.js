export async function changePasswordHandler (passwordData) {
    const passwordChangeResponse = await fetch('/api/user/change-password', {
        method: 'PATCH',
        body: JSON.stringify(passwordData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    const passwordResponseData = await passwordChangeResponse.json()
}