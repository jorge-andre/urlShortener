const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shortenUrlSchema = new Schema({
    originalUrl: String,
    urlCode: String,
    shortUrl: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

var ShortenUrl = mongoose.model("ShortenUrl", shortenUrlSchema);