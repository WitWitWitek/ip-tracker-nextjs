import { hashPassword } from "../../../lib/auth";
import connectToDatabase from '../../../lib/db'

export default async function handler (req, res) {
    if (req.method === 'POST') {
        const data = req.body
        const {username, email, password} = data
        
        if (
            !username ||
            !email ||
            !email.includes('@') ||
            !password ||
            password.trim().length < 7
        ) {
            res.status(422).json({message: 'Invalid input - password should be at least 7 characters long'})
            return
        }

        const client = await connectToDatabase()
        const db = client.db()

        const existingUsername = await db.collection('users').findOne({username: username})
        if (existingUsername) {
            res.status(422).json({message: 'Username exists already!'})
            client.close()
            return;
        }

        const existingEmail = await db.collection('users').findOne({email: email})
        if (existingEmail) {
            res.status(422).json({message: 'Email exists in db already!'})
            client.close()
            return;
        }

        const hashedPassword = await hashPassword(password)
        
        const result = await db.collection('users').insertOne({
            username,
            email,
            password: hashedPassword,
            ipItems: [],
        })
        
        res.status(201).json({message: 'Created user! Please log in.'})
        client.close()
    }
}