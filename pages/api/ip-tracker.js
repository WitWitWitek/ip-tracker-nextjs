export default async function handler (req, res) {
    const connectionString = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${process.env.GEO_API_KEY}`
    const searchParams = new URLSearchParams(connectionString)
    
    if (req.method === 'GET') {
        const response = await fetch(connectionString)
        const data = await response.json()
        res.status(201).json({message: 'Succesfully fetched users IP data!', data: data})
    }
   
    if (req.method === 'POST') {
        const userInputValue = req.body
        let usersInputDomain;
        let connectionStringUpdated;
        
        if (
            !userInputValue ||
            !userInputValue.includes('.') &&
            !userInputValue.includes(':')
            ) {
            res.status(422).json({message: 'Invalid input. Try again.'})
            return;
        }
        
        if (userInputValue.includes(':') && userInputValue.split(':').length < 4) {
            res.status(422).json({message: 'Invalid input. Try again.'})
            return;
        }

        try {
            usersInputDomain = new URL(userInputValue)
        } catch(err) {
            usersInputDomain = null
        }      

        if (usersInputDomain) {
            connectionStringUpdated = `${connectionString}&domain=${usersInputDomain.host}`
        } else {
            connectionStringUpdated = `${connectionString}&ipAddress=${userInputValue}`
        }

        const response = await fetch(connectionStringUpdated)

        if (!response.ok) {
            res.status(422).json({message: 'Invalid input. Try again.'})
            return;
        }
        
        const data = await response.json()
        res.status(201).json({message: 'Successfully fetched IP data!', data: data})  
    }


}
