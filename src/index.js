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
  const id = req.params.id;

  const post = posts.find((p) => p.id === parseInt(id));

  res.send(post);
});

app.post("/posts", (req, res) => {
  const post = req.body;

  post.content = post.content.replace("<p>", "").replace("</p>", "");
  post.contentPreview =
    post.content.length > 19 ? post.content.split(20)[0] + "..." : post.content;

  data.lastPostId++;
  post.id = data.lastPostId;

  posts.push(post);

  fs.writeFileSync("./src/data.json", JSON.stringify(data));
  res.send("ok");
});

app.get("/posts/:id/comments", (req, res) => {
  const postId = parseInt(req.params.id);

  const postComments = comments.filter((c) => c.postId === postId);

  res.send(postComments);
});

app.listen(4000);
