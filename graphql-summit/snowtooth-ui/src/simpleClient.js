import ApolloClient, { gql } from 'apollo-boost'
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

const operation = {
    query: gql`
		query {
			allLifts {
				name
			}
		}
	`
}

const mutation = {
    mutations: 
}

const getLifts = async () => {
    const { data } = await client.query(operation)
    const liftNames = data.allLifts.map(l => l.name).join(', ')

    console.log({ liftNames })
}

getLifts()

// client.query(operation).then(console.log).then(() => console.log(client))