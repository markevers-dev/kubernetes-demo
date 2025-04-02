const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;

const app = express();
const port = 5000;

const corsOptions = {
  origin: [`http://localhost:4173`, "*"],
};

app.use(cors(corsOptions));

const pool = new Pool({
  connectionString,
});

app.get("/", (req, res) => {
  res.send({ text: "Kubernetes Demo!" });
});

app.get("/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.post("/tasks/seed", async (req, res) => {
  const tasks = [
    [
      "Learn Docker",
      "Understand the basics of Docker and Docker Compose.",
      false,
    ],
    [
      "Setup Development Environment",
      "Install necessary tools and configure the environment.",
      true,
    ],
    ["Write Unit Tests", "Create unit tests for the backend services.", false],
    [
      "Design UI",
      "Design the user interface for the frontend application.",
      false,
    ],
    ["Deploy Application", "Deploy the application to a cloud service.", false],
  ];

  try {
    const exists = await pool.query("SELECT COUNT(*) FROM tasks");
    if (parseInt(exists.rows[0].count) > 0) {
      return res.json({ message: "Tasks already seeded." });
    }

    const insertQuery = `INSERT INTO tasks (title, description, completed) VALUES ($1, $2, $3)`;
    for (const task of tasks) {
      await pool.query(insertQuery, task);
    }

    res.json({ message: "Tasks seeded successfully." });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Kubernetes Demo app listening on port ${port}`);
});
