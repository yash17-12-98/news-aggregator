const { getTopHeadline } = require("../helpers/news");

let url = "https://newsapi.org/v2/top-headlines";

const getNews = async (req, res) => {
  try {
    let data = await getTopHeadline(url, ["general", "technology"]);

    return res.status(200).send({ news: data });
  } catch (e) {
    return res.status(500).send("Something went wrong");
  }
};

module.exports = { getNews };
