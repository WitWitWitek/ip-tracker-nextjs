import { getSession } from "next-auth/react";
import connectToDatabase from "../../../lib/db";

export default async function handler (req, res) {
    if (req.method === 'GET') {
        const client = await connectToDatabase()
        const usersCollection = client.db().collection('users')

        const session = await getSession({req: req})
        const userExists = await usersCollection.findOne({username: session.user.name})
        
        if (!userExists) {
            res.status(403).json({message: `User doesn't exist. Action forbidden.`});
            return;
        }

        if (!userExists.ipItems) {
            res.status(422).json({message: `You haven't created list of favourites ip addresses so far.`});
            return;
        }

        const ipAddressesArray = [...userExists.ipItems]

        res.status(201).json({message: 'Ip list successfully fetched!', ipAddressesData: ipAddressesArray})
        client.close()

    }


    if (req.method === 'POST') {
        const {user, ipAddressData} = req.body

        const client = await connectToDatabase()
        const usersCollection = client.db().collection('users')

        const userExists = await usersCollection.findOne({username: user})
        if (!userExists) {
            res.status(403).json({message: `User doesn't exist. Action forbidden.`});
            return;
        }
        
        const ipAddressesArray = userExists.ipItems ? [...userExists.ipItems] : []
        const ipExists = ipAddressesArray.find(ipItem => ipItem.ip === ipAddressData.ip)
        if (ipExists) {
            res.status(422).json({message: 'Selected IP exists in your favourites. Check your profile and display it.'});
            return;
        }

        ipAddressesArray.push(ipAddressData)
        const updateUsersIpAddresses = await usersCollection.updateOne(
            {username: user}, 
            {$set: {ipItems: ipAddressesArray}}
        )

        res.status(201).json({message: 'Selected IP successfully added to your list of favourites.'})
        client.close()
    }

    if (req.method === 'DELETE') {
        const {user, ipAddressData} = req.body

        const client = await connectToDatabase()
        const usersCollection = client.db().collection('users')

        const userExists = await usersCollection.findOne({username: user})
        if (!userExists) {
            res.status(403).json({message: `User doesn't exist. Action forbidden.`});
            return;
        }
        
        if (userExists.ipItems.length === 0 || !userExists.ipItems) {
            res.status(403).json({message: `User hasn't choosen any favourites ip addresses yet.`});
            return;
        }

        const ipDeleted = userExists.ipItems.filter(ipItem => ipItem.ip !== ipAddressData.ip);
        const updateUsersIpAddresses = await usersCollection.updateOne(
            {username: user}, 
            {$set: {ipItems: ipDeleted}}
        )

        res.status(201).json({message: 'Selected IP successfully removed from your list of favourites.', ipAddressesData: ipDeleted})
        client.close()
    }
}