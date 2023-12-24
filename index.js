require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./config/db");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
const PORT = 5000;
app.get("/", (req, res) => {
  connection.query("SELECT * FROM posts", (err, rows) => {
    if (err) {
      console.log(err);
    } else {
      res.send(rows);
    }
  });
});

app.get("/employees/:id", (req, res) => {
  connection.query(
    "SELECT *FROM posts WHERE id=?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.post("/employees", (req, res) => {
  const empData = [req.body.title, req.body.body, req.body.created_at];
  connection.query(
    "INSERT INTO posts(title,body,created_at) values(?)",
    [empData],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.put("/employees/:id", (req, res) => {
  const emp = req.body;
  connection.query(
    "UPDATE posts SET? WHERE id=" + [req.params.id],
    [emp],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.delete("/employees/:id", (req, res) => {
  connection.query(
    "DELETE FROM posts  WHERE id=?",
    [req.params.id],
    (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
