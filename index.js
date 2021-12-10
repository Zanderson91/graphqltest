import express from "express";
import schema from "./schema.js";
import { graphqlHTTP } from "express-graphql";

const app = express();

app.get("/", (req, res) => {
  res.send("Graphql is amazing!");
});

const friendDatabase = {};

class Friend {
  constructor (id, { firstName, lastName, gender, email }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.email = email;
  }
}


const root = {
  friend: () => {
    return {
      "id": 238745287365,
      "firstName": "Zack",
      "lastName": "Anderson",
      "gender": "Male",
      "email": [
        { email: "zack.andersson2011@gmail.com" },
        { email: "me@me.com" }
      ]
  }
  },
  createFriend: ({ input }) => {
    let id = require('crypto').randomBytes(10).toString('hex');
    friendDatabase[id] = input;
    return new Friend(id, input);
  }
};


app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(8080, () => console.log("Running on localhost:8080/graphql"));
