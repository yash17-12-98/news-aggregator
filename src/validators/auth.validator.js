class Validator {
  static validatRegisterUserInfo(userInfo) {
    if (
      userInfo.hasOwnProperty("name") &&
      userInfo.hasOwnProperty("email") &&
      userInfo.hasOwnProperty("password") &&
      userInfo.hasOwnProperty("preferences")
    ) {
      return { status: true, message: "Register User Info has been validated" };
    } else {
      return {
        status: false,
        message:
          "Register User info is malformed, Please provide me all the parameters",
      };
    }
  }

  static validatLoginUserInfo(userInfo) {
    if (
      userInfo.hasOwnProperty("email") &&
      userInfo.hasOwnProperty("password")
    ) {
      return { status: true, message: "Login User Info has been validated" };
    } else {
      return {
        status: false,
        message:
          "Login User info is malformed, Please provide email and password",
      };
    }
  }
}

module.exports = Validator;
