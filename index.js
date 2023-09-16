const express = require("express")
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express();

const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')
const Blog = require('./models/blog')
const { checkForAuthenticationCookie } = require("./middleware/authentication")

const port = 8000;

mongoose.connect('mongodb+srv://shreyashgaikwad27:blog@cluster0.evakvdg.mongodb.net/blog?retryWrites=true&w=majority')
    .then((e) => console.log('connected'))

app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))


app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))

app.get("/", async (req, res) => {
    const allBlog = await Blog.find({})
    res.render("home", {
        user: req.user,
        blogs: allBlog
    })
})
app.use("/user", userRoute)
app.use("/blog", blogRoute)

app.listen(port, () => {
    console.log('running')
})

//partials is component

//a@gmail.com
//password aa


//second video
//13min not working
//22.44min not working