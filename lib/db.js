import { MongoClient } from 'mongodb'

export default async function connectToDatabase() {
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.gzzgpwj.mongodb.net/auth-demo?retryWrites=true&w=majority`
    )
    return client;
}