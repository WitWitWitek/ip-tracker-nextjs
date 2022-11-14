import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import connectToDatabase from "../../../lib/db";

export default async function handler (req, res) {
    if (req.method !== 'PATCH') {
        return;
    }

    const session = await getSession({req: req})
    if (!session) {
        res.status(422).json({message: 'User is not authenticated! Log in to change password.'})
    }

    const username = session.user.name
    const oldPassword = req.body.oldPassword
    const newPassword = req.body.newPassword

    const client = await connectToDatabase()
    const usersCollection = client.db().collection('users')

    const user = await usersCollection.findOne({username: username})

    if (!user) {
        res.status(404).json({message: 'User not found.'})
        client.close()
        return;
    }

    const currentUserPassword = user.password;
    const oldPasswordsAreVeryfied = await verifyPassword(oldPassword, currentUserPassword)
    if (!oldPasswordsAreVeryfied) {
        res.status(403).json({ message: 'Invalid old password. Try again.' });
        client.close();
        return;
    }

    const hashedNewPassword = await hashPassword(newPassword)
    const updateUsersPassword = await usersCollection.updateOne({username: username}, {$set: {password: hashedNewPassword}})
    
    client.close()
    res.status(200).json({message: 'Password updated!'})
}