const express = require("express");
const cors = require("cors");
const url = require("url");
require("dotenv").config();
const needle = require("needle");
const app = new express();
const PORT = process.env.PORT || 4000;

const API_URL = process.env.API_URL;
const API_KEY_VARIABLE = process.env.API_KEY_VARIABLE;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

app.use(cors());
app.get(`/movie/:id`, async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_VARIABLE]: API_KEY_VALUE,
      ...url.parse(req.url, req.params, true).query,
    });
    const { id } = req.params;
    const path = `${API_URL}/movie/${id}?${params}`;
    const apiResponse = await needle("get", path);
    const data = apiResponse.body;
    res.status(200).json(data);
  } catch (ex) {
    res.status(500).json({ ex });
  }
});
app.get("/discover/movie", async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_VARIABLE]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });
    const path = `${API_URL}/discover/movie?${params}`;

    const apiResponse = await needle("get", path);
    const data = apiResponse.body;
    res.status(200).json(data);
  } catch (ex) {
    res.status(500).json({ ex });
  }
});

app.get("/genre/movie/list", async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_VARIABLE]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });
    const path = `${API_URL}/genre/movie/list?${params}`;
    const apiResponse = await needle("get", path);
    const data = apiResponse.body;
    res.status(200).json(data);
  } catch (ex) {
    res.status(500).json({ ex });
  }
});
app.listen(PORT, () => console.log(`Proxy server listening at port ${PORT}`));
