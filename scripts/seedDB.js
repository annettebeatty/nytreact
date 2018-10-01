const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/nytlist"
);

const noteSeed = [
  {
    id: "5bb166be068401528a2ddc21",
    title: "Japan Third Quarter Business Mood Worsens for 3rd Straight Quarter - BOJ Tankan",
    author: "By REUTERS",
    url: "https://www.nytimes.com/reuters/2018/09/30/business/30reuters-japan-economy-tankan.html",
    date: "2018-10-01T00:13:47+0000"
  },
  {
    id: "5bb164bb068401528a2ddc1f",
    title: "Elon Musk Settled With the S.E.C., but Tesla’s Troubles Aren’t Over",
    author: "By DAVID GELLES, MATTHEW GOLDSTEIN and NEAL E. BOUDETTE",
    url: "https://www.nytimes.com/2018/09/30/business/elon-musk-tesla-whats-next.html",
    date: "2018-10-01T00:05:12+0000"
  }
];

db.Note
  .remove({})
  .then(() => db.Note.collection.insertMany(noteSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
