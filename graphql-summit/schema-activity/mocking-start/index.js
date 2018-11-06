const { ApolloServer, MockList } = require('apollo-server')
const faker = require('faker')

const typeDefs = `
    type Post {
        id: ID!
        subreddit: Subreddit!
        title: String!
        description: String!
        postedDate: String!
        updatedDate: String!
        user: User!
        comments: [Comment!]!
    }
    type Subreddit {
        id: ID!
        name: String!
    }
    type User {
        id: ID!
        name: String!
        joinedDate: String!
    }
    type Comment {
        user: User!
        description: String!
        postedDate: String!
        updatedDate: String!
    }
    type Query {
        redditFrontpage: [Post!]!
    }
`

// const typeDefs = `
//     type Cat {
//         id: ID!
//         name: String!
//         age: Int!
//         nice: Boolean
//     }
//     type Query {
//         allCats: [Cat!]!
//     }
// `

const mocks = {
    Query: () => ({
        redditFrontpage: () => new MockList([1, 1])
    }),
    Post: () => ({
        id: faker.random.uuid(),
        title: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        postedDate: faker.date.recent(),
        updatedDate: faker.date.future()
    }),
    Subreddit: () => ({
        id: faker.random.uuid(),
        name: faker.commerce.productMaterial()
    }),
    User: () => ({
        id: faker.random.uuid(),
        name: faker.name.lastName(),
        joinedDate: faker.date.past()
    }),
    Comment: () => ({
        description: faker.lorem.paragraphs(),
        postedDate: faker.date.recent(),
        updatedDate: faker.date.future()
    })
    // ID: () => faker.random.uuid(),
    // Int: () => faker.random.number({ min: 1, max: 100 }),
    // String: () => faker.name.firstName(),
    // Boolean: () => faker.random.boolean()
}

const server = new ApolloServer({
    typeDefs,
    // mocks: true
    mocks
})

server.listen().then(() => console.log('Server running on 4000'))