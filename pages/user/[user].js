import connectToDatabase from "../../lib/db"

export async function getStaticPaths(context) {
    const client = await connectToDatabase();
    const usersCollection = client.db().collection('users');
    const user = await usersCollection.find().toArray()

    console.log(user);

    // find all users and create static pages for them.
    // exctract id with MongoObjectId and create dynamic paths :)
    return {
        paths: [
            { params: { user: '6353e5919f1e9e601c5bf160' } }
        ],
        fallback: true
    }
}

export async function getStaticProps({params}) {
    return {
        props: {
            user: params.user
        }
    }
}


export default function User(props) {
  return (
    <div>{props.user}</div>
  )
}
