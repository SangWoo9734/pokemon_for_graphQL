require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");
const { type } = require("os");

const { PORT, USER_ID, PASSWORD } = process.env;

const MongoClient = require("mongodb").MongoClient;

var db;

MongoClient.connect(
  `mongodb+srv://${USER_ID}:${PASSWORD}@cluster0.gwg1h.mongodb.net/pokeranking?retryWrites=true&w=majority`,
  (err, client) => {
    if (err) return console.log(err);

    db = client.db("pokeranking");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  },
);
// body-parser : 클라이언트 POST request data의 body로부터 파라미터를 편리하게 추출

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.get("/rank/ranking", async (req, res) => {
  const { type, difficulty } = req.query;
  const data = await db.collection(`${type}/${difficulty}`).find().toArray();

  return res.json({ rank: data });
});

app.put("/rank/update", async (req, res) => {
  const { id, type, difficulty, data } = req.body;

  try {
    await db
      .collection(`${type}/${difficulty}`)
      .updateOne({ _id: id }, { $set: { rank: data } }, () => {
        res.send({
          status: res.status,
          message: "Save Rank Success...",
        });
      });
  } catch (err) {
    res.send({
      status: res.status,
      message: "Error is occured.",
    });
  }
});
