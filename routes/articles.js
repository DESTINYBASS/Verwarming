const express = require("express");
const Article = require("./../models/article");
const router = express.Router();
const { spawn } = require("child_process");

router.get("/new", (req, res) => {
    res.render("kamers/new", {article: new Article() })
})

router.get("/edit/:id", async (req, res) =>{
    const article = await Article.findById(req.params.id)
    res.render("kamers/edit", {article: article})
})

router.get("/:slug", async (req, res) => {
    getPython();
    const article = await Article.findOne({ slug: req.params.slug})
    if(article == null) res.redirect("/")
    res.render("kamers/show", { article: article })
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put("/:id", async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect("edit"))

router.delete("/:id", async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect("/")
})

router.put("/:id", async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
}, saveArticleAndRedirect("show"))

function getPython(){
    var dataToSend;
    const python = spawn('python', ['script1.py']);

    python.stdout.on('data', function (data) {
        dataToSend = data.toString();
    });

    python.on('close', async (code) => {
        console.log(dataToSend)
        let newInt = parseInt(dataToSend);
        router.put("/:id", async (req, res, next) => {
            req.article = await Article.findById(req.params.id);
            Article = await Article.update(req.params.id, { $push: { pastTemp: newInt}});
            console.log("passed here");
            next();
        }, saveArticleAndRedirect("show"));
    });
}

function saveArticleAndRedirect(path){
    return async (req, res) => {
        let article = req.article;
        article.title = req.body.title;
        article.pastTemp = req.body.pastTemp
        try {
            article = await article.save();
            res.redirect("/");
        } catch (e) {
            res.render(`kamers/${path}`, { article: article });
            console.log(e);
        }
    }
}

module.exports = router;