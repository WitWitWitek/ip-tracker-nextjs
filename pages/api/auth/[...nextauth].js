import NextAuth from "next-auth/next";
import CredentialsProvider  from "next-auth/providers/credentials"
import { verifyPassword } from "../../../lib/auth";
import connectToDatabase from '../../../lib/db'

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            async authorize(credentials) {
                const client = await connectToDatabase();
                const usersCollection = client.db().collection('users');
                const user = await usersCollection.findOne({email: credentials.email})


                if (!user) {
                    throw new Error('No user found!');
                }

                const isValid = await verifyPassword(credentials.password, user.password);

                if (!isValid) {
                    throw new Error('Could not log you in!');ƒ
                }

                client.close();
                return { email: user.email }
            }
        })
    ]
})