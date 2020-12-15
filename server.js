if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const Article = require("./models/article");
const app = express();
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.set("view engine", "ejs");

app.use(express.static("views"))
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))

app.get("/", async (req, res) => {
    const articles = await Article.find().sort({ createdAt: "desc"})
    res.render("kamers/index", { articles: articles});
})

app.use("/kamers", articleRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));