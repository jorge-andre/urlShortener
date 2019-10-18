const HOST = "127.0.0.1";
const PORT = 7000;
// Require express module
const express = require("express");
const validUrl = require("valid-url");
const bodyParser = require("body-parser");
const models = require("./models/redisModel");
const router = express.Router();
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.get('/:url', (req, res) => {
  try {
    let url = await models.findUrl(req.params.url);
    if (url !== null) {
      res.redirect(url);
    } else {
      res.send('Invalid/Expired URL');
    }
  } catch (error) {
    console.log(error);
    res.send('Invalid/Expired URL');
  }
});

router.post('/api/short', async (req, res) => {
  if (validUrl.isUri(req.body.url)) {
    try {
      let hash = await models.storeUrl(req.body.url);
      res.send(req.hostname + '/' + hash);
    }
    catch (error) {
      console.log(error);
      res.send('Invalid URL');
    }
  } else {
    res.send('Invalid URL');
  }
});

app.use('/', router);

//Start server on Port 7000
app.listen(PORT, () => {
 console.log(`Server started on port`, PORT);
});