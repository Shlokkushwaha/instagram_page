const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const { v4: uuidv4 } = require("uuid");

app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [
    {
        id: uuidv4(),
        username: "shlok",
        content: "My first post"
    },
    {
        id: uuidv4(),
        username: "rahul",
        content: "Good morning everyone"
    },
    {
        id: uuidv4(),
        username: "aman",
        content: "Learning REST APIs today"
    }
];

//Show All Posts
app.get("/posts", (req,res)=>{
    res.render("index.ejs", {posts});
});

// Open Form to Create New Post
app.get("/posts/new", (req,res)=>{
    res.render("new.ejs");
});

//create new post
app.post("/posts",(req,res)=>{
    let id = uuidv4();
    let { username , content } = req.body;
    posts.push({ id, username , content});
    res.redirect("/posts");

});

//Show One Specific Post
app.get("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    console.log(post);
    res.render("show.ejs", {post});
});

//Edit Page for Post
app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

//Update Post Content
app.patch("/posts/:id",(req,res)=> {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);;
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

//delete post
app.delete("/posts/:id", (req,res)=>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});





app.listen(port, () => {
    console.log("listening to port : 3000");
});