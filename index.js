const express = require("express");
const app = express();

app.get("/", (_req, res) => {
  return res.json("MINIMAISTIC EXPRESS APP");
});

app.listen(3000, () => {
  return console.log(`🟡 LOG - : Listening on port 3000`);
});
