import express, { json } from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(express.json());

app.use(cors());

const data = fs.existsSync("./src/data.json")
  ? JSON.parse(fs.readFileSync("./src/data.json"))
  : { posts: [], comments: [] };

const posts = data.posts;
const comments = data.comments;

app.get("/posts", (req, res) => {
  console.log("get at /posts");
  console.log(posts);
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
  fs.writeFileSync("./src/data.json", JSON.stringify(data));
  res.send("ok");
});

app.listen(4000);
