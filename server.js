if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const { spawn } = require("child_process");

function getPython(){
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['script1.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
        // console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        // console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        // res.send(dataToSend)
        console.log(dataToSend);
    });
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