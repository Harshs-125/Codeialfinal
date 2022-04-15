const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  console.log("auth is called");
  let token = req.header("Authorization");
  //token = token.split(" ")[1];
  if (!token) {
    res.json("401", {
      message: "no token authorization",
    });
  }
  try {
    await jwt.verify(token, "codeial");
    const decoded = jwt.decode(token);
    console.log("Jwt",decoded);
    req.userId=decoded._id;
    next();
  } catch (err) {
    console.log(err);
    res.json("500", {
      message: "server error",
    });
  }
};

module.exports = auth;
