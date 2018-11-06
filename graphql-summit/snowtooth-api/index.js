const { ApolloServer } = require('apollo-server')
const lifts = require('./data/lifts.json')

const typeDefs = `
enum LiftStatus {
    OPEN
    CLOSED
    HOLD
}

type Lift {
    id: ID
    name: String
    status: LiftStatus
    capacity: Int
    night: Boolean
    elevationGain: Int
}

type Query {
    allLifts: [Lift!]!
    lift(id: ID!): Lift!
}
`

const resolvers = {
    Query: {
        allLifts: () => lifts,
        lift: (
            parent,  //Parent Object (lift)
            args
        ) => {
            let [selectedLift] = lifts.filter(lift => args.id === lift.id)
            return selectedLift
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(() => console.log("server running on 4000"))