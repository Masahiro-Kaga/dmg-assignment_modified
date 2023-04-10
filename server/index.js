const express = require("express");
const app = express();
require("dotenv").config({ path: "../.env" });
const PORT = process.env.SERVER_PORT || 4000;
const pool = require("./db");

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// pool.query(
//   `CREATE TABLE IF NOT EXISTS todos(
//     todo_id SERIAL PRIMARY KEY,
//     description VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     completed BOOLEAN DEFAULT FALSE
// )`,
//   (err, res) => {
//     if (err) {
//       console.log(err);
//     } else if (res.command === "CREATE") {
//       console.log(res);
//       console.log("Table 'todos' created successfully");
//     } else {
//       console.log("Table 'todos' already exists");
//     }
//   }
// );

pool.query(`SELECT to_regclass('public.todos')`, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    if (!res.rows[0].to_regclass) {
      pool.query(
        `CREATE TABLE public.todos (
          todo_id SERIAL PRIMARY KEY,
          description VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          completed BOOLEAN DEFAULT FALSE
        )`,
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Table 'todos' created successfully");
          }
        }
      );
    }
    // else {
    //     console.log("Table 'todos' already exists");
    // }
  }
});

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todos");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const oneTodos = await pool.query(
      "SELECT * FROM todos WHERE todo_id = $1",
      [id]
    );
    res.json(oneTodos.rows);
  } catch (err) {
    console.error(err);
  }
});

app.post("/todos", async (req, res) => {
  const { description } = req.body;
  try {
    await pool.query(
      "INSERT INTO todos (description) VALUES($1) RETURNING *",
      [description]
    );
    const allTodos = await pool.query("SELECT * FROM todos")
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  // const { todo_id, description, created_at, completed } = req.body;
  const { description } = req.body;
  try {
    await pool.query("UPDATE todos SET description = $1 WHERE todo_id = $2", [
      description,
      id,
    ]);
    const allTodos = await pool.query("SELECT * FROM todos");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err);
  }
});

app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await pool.query("DELETE FROM todos WHERE todo_id = $1", [id]);
    const allTodos = await pool.query("SELECT * FROM todos");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} `);
});
