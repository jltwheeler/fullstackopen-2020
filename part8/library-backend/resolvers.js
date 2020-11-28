const { PubSub, UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const { JWT_SECRET } = require("./constants");
const author = require("./models/author");

const pubsub = new PubSub();

module.exports = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.author) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author._id, genres: args.genre }).populate(
          "author"
        );
      } else if (args.genre) {
        return Book.find({ genres: args.genre }).populate("author");
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author._id }).populate("author");
      }

      return Book.find({}).populate("author");
    },
    allAuthors: async () => {
      let authors = await Author.find({}).populate("books");
      authors = authors.map((author) => {
        return {
          name: author.name,
          id: author._id,
          born: author.born,
          bookCount: author.books.length,
        };
      });
      return authors;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      let author;
      author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const book = new Book({ ...args, author: author._id });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      if (author.books) {
        author.books = author.books.concat(book._id);
      } else {
        author.books = [book._id];
      }

      await author.save();

      pubsub.publish("BOOK_ADDED", {
        bookAdded: book.populate("author").execPopulate(),
      });

      return book.populate("author").execPopulate();
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      );

      return author;
    },
    createUser: (root, args) => {
      const user = new User({ ...args });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, { invalidArgs: args });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new UserInputError("Wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};
