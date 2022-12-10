import Head from "next/head";
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
        fallback: true,
    }
}

export async function getStaticProps({params}) {
    const client = await connectToDatabase();
    const usersCollection = client.db().collection('users');
    const user = await usersCollection.findOne({username: params.user})

    client.close();
    
    if(!user) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            username: params.user,
            ipData: user.ipItems || null
        },
    }
}

export default function User({username}) {
    return (
        <>
            <Head>
                <title>IP Adress Tracker | User Page</title>
            </Head>
            <UserPage username={username} />
        </>
    )
}
