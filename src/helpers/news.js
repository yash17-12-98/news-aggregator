const { default: axios } = require("axios");

const getTopHeadline = (url, preferences) => {
  return new Promise((resolve, reject) => {
    const params = {
      category: preferences,
      apiKey: process.env.NEWSAPI_KEY,
    };

    axios
      .get(url, {
        params,
        paramsSerializer: (params) => {
          const searchParams = new URLSearchParams();
          for (const key of Object.keys(params)) {
            const param = params[key];
            if (Array.isArray(param)) {
              for (const p of param) {
                searchParams.append(key, p);
              }
            } else {
              searchParams.append(key, param);
            }
          }
          return searchParams.toString();
        },
      })
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

module.exports = { getTopHeadline };
