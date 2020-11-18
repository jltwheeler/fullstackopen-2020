const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("./constants");
const typeDefs = require("./queries");
const resolvers = require("./resolvers");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://josh:8sVg2hC4aRn6vXMe@dev-cluster-jw.yf3vb.mongodb.net/library?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id).populate(
        "friends"
      );
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
