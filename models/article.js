const mongoose = require("mongoose");
const slugify = require("slugify");

const articleSchema = new mongoose.Schema({
        title :{
            type: String,
            required: true
        },
        description: {
            type: Number
        },
        dateone: {
            type: Number
        },
        datetwo: {
            type: Number
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        amount: {
            type: Number,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        color: {
            type: String,
            required: true
        },
        price: {
            type: Number
        },
        herkomst: {
            type: String
        },
        land: {
            type: String
        },
        streek: {
            type: String
        }
})

articleSchema.pre("validate", function(next){
    if (this.title){
        this.wijnen.slug = slugify(this.title + " " + this.description, { lower: true, strict: true})
    }
    next()
});

module.exports = mongoose.model("Article", articleSchema);