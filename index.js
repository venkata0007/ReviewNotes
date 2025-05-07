import express from 'express';
import path from 'path';
import pg from 'pg';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a new PostgreSQL client

const db  = new pg.Client({
  user: "postgres",
  host: "localhost",
  database :"postgres",
  password: "pwd",
  port: 5432
})
db.connect();
var app = express();
const port = 3000;
// use body-parser to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// look for static files in the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use()
// Set the view engine to ejs
app.set("view engine", "ejs");


//get the home page
app.get("/", (req, res) => {
  res.render("index.ejs");
}
);











//start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
