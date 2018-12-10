const { GraphQLServerLambda } = require('graphql-yoga')
process.env.NODE_CONFIG_DIR = process.env["LAMBDA_TASK_ROOT"] + "/config";
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
    config: (_) => JSON.stringify({...config, dirname: __dirname, taskRoot: process.env["LAMBDA_TASK_ROOT"], env: process.env})
  },
}

const lambda = new GraphQLServerLambda({
  typeDefs,
  resolvers,
})

exports.handler = lambda.handler
