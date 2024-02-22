const allAuthenticatedUsers = require("../users.json");
const fs = require("fs");
const Validator = require("../validators/validator");

const getPreferences = (req, res) => {
  return res.status(200).send({ preferences: req.user.preferences });
};

const updatePreferences = (req, res) => {
  const { preferences } = req.body;

  if (Validator.validateNewsPreferences(preferences).status === false) {
    return res.status(400).send({
      message: Validator.validateNewsPreferences(preferences).message,
    });
  }

  const authUser = req.user;

  let userData = allAuthenticatedUsers;

  const userIndex = userData.users.findIndex(
    (user) => user.email === authUser.email
  );

  if (userIndex === -1) {
    return res.status(404).send({ message: "No user found" });
  }

  userData.users[userIndex].preferences = preferences;

  fs.writeFile(
    "./src/users.json",
    JSON.stringify(userData),
    { encoding: "utf8", flag: "w" },
    (err) => {
      if (err) {
        return res.status(500).send({
          message:
            "Something went wrong while writing the user to file, Please try again!",
        });
      } else {
        return res.status(200).send(userData.users[userIndex].preferences);
      }
    }
  );
};

module.exports = { getPreferences, updatePreferences };
