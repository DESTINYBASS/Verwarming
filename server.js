if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const { spawn } = require("child_process");
const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const Article = require("./models/article");
const article = require("./models/article");
const app = express();
const PORT = process.env.PORT || 5001;
const router = express.Router()

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
});

function getPython(){
    var dataToSend;
    const python = spawn('python', ['script1.py']);

    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
    });

    python.on('close', (code) => {
        router.put("/", async (req, res, next) => {
            dataToSend = dataToSend.split(",");
            let emptyArray = []
            dataToSend.forEach(el => {
                try{
                    let newInt = parseInt(el);
                    if(!Number.isNaN(newInt)){
                        article.pastTemp.push(newInt);
                    }
                } catch (e){
                    console.log(e);
                }
            });
            req.article = await Article.findById(req.params.id);
            return async (req, res) => {
                let article = req.article
                article.pastTemp = emptyArray
                try{
                    article = await article.save()
                    res.redirect("/")
                } catch(e){
                    res.render("/kamers", { article: article })
                    console.log(e)
                }
            }
        })
    });
}

app.set("view engine", "ejs");

app.use(express.static("views"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
    const articles = await Article.find().sort({ createdAt: "desc"});
    getPython();
    res.render("kamers/index", { articles: articles});
})

app.use("/kamers", articleRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));