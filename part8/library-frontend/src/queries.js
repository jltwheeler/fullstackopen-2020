import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
        id
        born
        bookCount
      }
      id
      genres
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      author {
        name
        bookCount
        born
      }
      published
      id
      genres
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      name
      id
      born
      bookCount
    }
  }
`;

export const GET_ME = gql`
  query {
    me {
      username
      id
      favoriteGenre
    }
  }
`;
