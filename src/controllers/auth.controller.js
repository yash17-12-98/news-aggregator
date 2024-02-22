const authenticatedUsers = require("../users.json");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Validator = require("../validators/validator");

const signUp = (req, res) => {
  const userRequest = req.body;

  console.log("user body", userRequest);

  if (Validator.validatRegisterUserInfo(userRequest).status === false) {
    return res
      .status(400)
      .json(Validator.validatRegisterUserInfo(userRequest).message);
  }

  const newUser = {
    name: userRequest.name,
    email: userRequest.email,
    password: bcrypt.hashSync(userRequest.password, 8),
    preferences: userRequest.preferences,
  };

  let modifiedAuthenticatedList = authenticatedUsers;
  modifiedAuthenticatedList.users.push(newUser);

  console.log("Authenticated user", modifiedAuthenticatedList);

  fs.writeFile(
    "./src/users.json",
    JSON.stringify(modifiedAuthenticatedList),
    { encoding: "utf8", flag: "w" },
    (err) => {
      if (err) {
        return res.status(500).send({
          message:
            "Something went wrong while writing the user to file, Please try again!",
        });
      } else {
        return res.status(200).send({ message: "User created successfully" });
      }
    }
  );
};

const login = (req, res) => {
  const userRequest = req.body;

  if (Validator.validatLoginUserInfo(userRequest).status === false) {
    return res
      .status(400)
      .json(Validator.validatLoginUserInfo(userRequest).message);
  }

  const existingUser = authenticatedUsers.users.find(
    (user) => user.email === userRequest.email
  );

  console.log("Existing User", existingUser);

  if (!existingUser) {
    return res.status(404).json({ meesage: "User not found" });
  }

  console.log("user request pwd", userRequest.password);

  console.log("user request pwd", existingUser.password);

  const isPasswordValid = bcrypt.compareSync(
    userRequest.password,
    existingUser.password
  );

  console.log("Check isPasswordValid ", isPasswordValid);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = generateAccessToken(existingUser.email);

  console.log("Token", token);

  return res.status(200).json({
    message: "Login successfully",
    token: token,
    user: { name: existingUser.name, email: existingUser.email },
  });
};

function generateAccessToken(email) {
  return jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: 86400,
  });
}

module.exports = { login, signUp };
