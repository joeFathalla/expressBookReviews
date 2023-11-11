const express = require("express");
const axios = require("axios").default;
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
// public_users.get("/", function (req, res) {
//   res.send(JSON.stringify({ books }, null, 4));
// });
public_users.get("/", function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    resolve(books);
  });

  myPromise.then((result) => {
    res.send(JSON.stringify({ books: result }, null, 4));
  });
});

// Get book details based on ISBN
// public_users.get("/isbn/:isbn", function (req, res) {
//   const isbn = req.params.isbn;
//   res.send(books[isbn]);
// });
public_users.get("/isbn/:isbn", function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    resolve(books[isbn]);
  });

  myPromise.then((result) => {
    res.send(result);
  });
});

// Get book details based on author
// public_users.get("/author/:author", function (req, res) {
//   const author = req.params.author;
//   let booksByAuthor = [];
//   Object.values(books).forEach((book) => {
//     if (book.author === author) {
//       booksByAuthor.push(book);
//     }
//   });
//   if (booksByAuthor.length > 0) {
//     return res.send({ booksByAuthor });
//   } else {
//     return res.status(404).json({ message: "book author not found!" });
//   }
// });
public_users.get("/author/:author", function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    const author = req.params.author;
    let booksByAuthor = [];
    Object.values(books).forEach((book) => {
      if (book.author === author) {
        booksByAuthor.push(book);
      }
    });
    resolve(booksByAuthor);
  });

  myPromise.then((result) => {
    if (result.length > 0) {
      res.send(result);
    } else {
      return res.status(404).json({ message: "book author not found!" });
    }
  });
});

// Get all books based on title
// public_users.get("/title/:title", function (req, res) {
//   const title = req.params.title;
//   let booksByTitle = [];
//   Object.values(books).forEach((book) => {
//     if (book.title === title) {
//       booksByTitle.push(book);
//     }
//   });
//   if (booksByTitle.length > 0) {
//     return res.send({ booksByTitle });
//   } else {
//     return res.status(404).json({ message: "book Title not found!" });
//   }
// });
public_users.get("/title/:title", function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    const title = req.params.title;
    let booksByTitle = [];
    Object.values(books).forEach((book) => {
      if (book.title === title) {
        booksByTitle.push(book);
      }
    });
    resolve(booksByTitle);
  });

  myPromise.then((result) => {
    if (result.length > 0) {
      res.send(result);
    } else {
      return res.status(404).json({ message: "book Title not found!" });
    }
  });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
