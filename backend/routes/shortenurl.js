const mongoose = require("mongoose");
const validUrl = require("valid-url");
const ShortenUrl = mongoose.model("ShortenUrl");
const shortid = require("shortid");
const errorUrl = 'http://localhost/error';
const bodyParser = require("body-parser");

module.exports = app => {

    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );

    app.use(bodyParser.json());

    app.get("/api/item/:code", async(req, res) => {
        const urlCode = req.params.code;
        const item = await ShortenUrl.findOne({ urlCode: urlCode });
        if (item) {
            return res.redirect(item.originalUrl);
        } else {
            return res.redirect(errorUrl);
        }
    });

    app.post("/api/item", async(req, res) => {
        const originalUrl = req.body.originalUrl;
        const shortBaseUrl = req.body.shortBaseUrl;

        if (validUrl.isUri(shortBaseUrl)) {} else {
            return res
                .status(401)
                .json(
                    "Invalid Base Url"
                );
        }

        const urlCode = shortid.generate();
        const updatedAt = new Date();

        if (validUrl.isUri(originalUrl)) {
            try {
                const item = await ShortenUrl.findOne({ originalUrl: originalUrl });
                if (item) {
                    res.status(200).json(item);
                } else {
                    shortUrl = shortBaseUrl + "/" + urlCode;
                    const item = new ShortenUrl({
                        originalUrl,
                        shortUrl,
                        urlCode,
                        updatedAt
                    });
                    await item.save();
                    res.status(200).json(item);
                }

            } catch (err) {
                res.status(401).json("Invalid User Id");
            }

        } else {
            return res
                .status(401)
                .json(
                    "Invalid Original Url"
                );
        }
    });
};