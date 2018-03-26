import * as express from "express"
import * as bodyParser from "body-parser"
import { graphiqlExpress, graphqlExpress } from "apollo-server-express"
import { createSchema } from "graph-panda"

const schema = createSchema([
  {
    definitions: {
      Query: {
        fields: {
          nothing: {
            resolve: () => 42,
          },
        },
      },
    },
  },
])

console.log("there")

const app = express()

app.get("/test", (req, res) => {
  res.send("hi")
})

app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }))
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }))

const PORT = 8000
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`))
