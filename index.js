import express from 'express';
import path from 'path';
import pg from 'pg';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const db  = new pg.Client({
  user: "postgres",
  host: "localhost",
  database :"postgres",
  password: "pwd",
  port: 5432
})
db.connect();
//get the home page
app.get("/", async(req, res) => {
    var sortby = "created_at";
    if(req.query.sortby)
    {
        const requested = req.query.sortby;
        if(requested == "title")
        {
            sortby = "title";
        }
        else if(requested == "date")
        {
            sortby = "created_at";
        }
        else if(requested == "rating")
        {
            sortby = "rating";
        }
      }
    // send all books to the index.ejs file
    const result = await db.query("SELECT * FROM books ORDER BY " + sortby + " DESC;");
    let books = [];
    result.rows.forEach((book) => {
        books.push(book);
    });
    console.log(result.rows);
    res.render("index.ejs", { books: books });
}
);
app.post("/new", async(req, res) => {
    // add a book to the database
    const title = req.body.title;
    const author = req.body.author;
    const isbn = req.body.isbn;
    const rating = req.body.rating;
    await db.query("INSERT INTO books (title, author, rating, isbn) VALUES ($1, $2, $3, $4);", [title, author, rating, isbn]);
    res.redirect("/");
}
);










//start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
