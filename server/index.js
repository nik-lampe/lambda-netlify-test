const { GraphQLServerLambda } = require('graphql-yoga')
const config = require('config')

console.log(config)

const typeDefs = `
  type Query {
    hello(name: String): String,
    config: String
  }
`

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'world'}`,
    config: (_) => JSON.stringify(config)
  },
}

const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
})

exports.handler = lambda.handler
