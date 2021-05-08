const express = require("express");
const TeachableMachine = require("@sashido/teachablemachine-node");
const cors = require('cors');
const model = new TeachableMachine({
  modelUrl: "https://teachablemachine.withgoogle.com/models/eNrsh5UIK/"
});
 
const app = express();
let port = process.env.PORT || 3000;
app.use(cors());
app.get("/image/classify", async (req, res) => {
  const { url } = req.query;
 
  return model.classify({
    imageUrl: url,
  }).then((predictions) => {
    console.log(predictions);
    return res.json(predictions);
  }).catch((e) => {
    console.error(e);
    res.status(500).send("Something went wrong!")
  });
});
 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
