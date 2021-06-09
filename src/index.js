import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors());

const posts = ["a", "b"];
const comments = [];

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.get("/posts/:id", (req, res) => {
  const index = req.params.id;
  if (id >= 0 && id < posts.length) {
    res.send(posts[index]);
  } else {
    res.send("invalid id");
  }
});

app.post("/posts", (req, res) => {
  const post = req.body;
  posts.push(post);
  res.send("ok");
});

app.listen(4000);
