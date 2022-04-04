const express = require('express');
const app = express();
const axios = require('axios').default;

const url = "https://seffaflik.epias.com.tr/transparency/service/market/intra-day-trade-history?endDate=2022-01-26&startDate=2022-01-26";
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/trade-history', async function (req, res) {
  const response = await axios.get(url)
  console.log(response)
  res.json(response.data);
})

app.listen("8080", () => {
  console.log(`App port 8080`)
})