if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const { spawn } = require("child_process");
const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const Article = require("./models/article");
const app = express();
const PORT = process.env.PORT || 5001;

function getPython(){
    var dataToSend;
    const python = spawn('python', ['script1.py']);

    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
    });

    python.on('close', (code) => {
        console.log(dataToSend);
    });
}


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.set("view engine", "ejs");

app.use(express.static("views"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
    getPython();
    const articles = await Article.find().sort({ createdAt: "desc"});
    res.render("kamers/index", { articles: articles});
})

app.use("/kamers", articleRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));