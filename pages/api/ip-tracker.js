export default async function handler (req, res) {
    if (req.method === 'POST') {
        const IP = req.body
        // add validation 
        const connectionString = `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${process.env.GEO_API_KEY}&ipAddress=${IP}`
        const response = await fetch(connectionString)
        const data = await response.json()
        // add error handling 
        res.status(201).json({message: 'Succesfully fetched IP data!', data: data})
    }
}
