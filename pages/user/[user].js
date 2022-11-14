import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import UserPage from "../../components/UserPage/UserPage";
import connectToDatabase from "../../lib/db"

export async function getStaticPaths(context) {
    const client = await connectToDatabase();
    const usersCollection = client.db().collection('users');
    const users = await usersCollection.find().toArray()

    const paths = users.map(user => {
        return {
            params: { user: user.username }
        }
    })

    client.close();
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({params}) {
    const client = await connectToDatabase();
    const usersCollection = client.db().collection('users');
    const { ipItems } = await usersCollection.findOne({username: params.user})

    client.close();
    return {
        props: {
            username: params.user,
            ipData: ipItems
        },
        revalidate: 10,
    }
}


export default function User({ipData, username}) {
    const router = useRouter()
    const { status } = useSession()
    useEffect(() => {
        if (status !== 'authenticated') {
            router.replace('/auth/')
        }
    }, [status, router])
  
    return (
        <UserPage ipData={ipData} username={username} />
    )
}
