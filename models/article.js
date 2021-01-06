const mongoose = require("mongoose");
const slugify = require("slugify");

const database = new mongoose.Schema({
    title :{
        type: String,
        required: true
    },
    temperature: {
        type: Number
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    pastTemp: {
        type: Number
    }
})

database.pre("validate", function(next){
    if (this.title){
        this.slug = slugify(this.title, { lower: true, strict: true})
    }
    next()
});

module.exports = mongoose.model("Article", database);