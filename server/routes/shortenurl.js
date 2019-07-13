const mongoose = require("mongoose");
const validUrl = require("valid-url");
const ShortenUrl = mongoose.model("ShortenUrl");
const shortid = require("shortid");
const errorUrl='http://localhost/error';

module.exports = app => {

  app.get("/api/item/:code", async (req, res) => {
    const urlCode = req.params.code;
    const item = await ShortenUrl.findOne({ urlCode: urlCode });
    if (item) {
      return res.redirect(item.originalUrl);
    } else {
      return res.redirect(errorUrl);
    }
  });

  app.post("/api/item", async (req, res) => {
    const { originalUrl, shortBaseUrl } = req.body;
    if (validUrl.isUri(shortBaseUrl)) {
    } else {
      return res
        .status(401)
        .json(
          "Invalid Base Url"
        );
    }
    const updatedAt = new Date();
    const queryOptions = { originalUrl };
    if (validUrl.isUri(originalUrl)) {
      try {
        
          const urlCode = shortCode.generate();
          shortUrl = shortBaseUrl + '/' + urlCode;
          const itemToBeSaved = { originalUrl, shortUrl, urlCode, updatedAt };

          // Add the item to db
          const item = new UrlShorten(itemToBeSaved);
          await item.save();
          res.status(200).json(itemToBeSaved);
        
      } catch (err) {
        res.status(401).json('Invalid User Id');
      }
    } else {
      return res.status(401).json('Invalid Original Url.');
    }
  });
};