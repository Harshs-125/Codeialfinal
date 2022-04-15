const User = require("../../../models/users");
const jwt = require("jsonwebtoken");

const auth = require("../middleware/auth");
module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user?.password != req.body.password) {
      return res.json(401, {
        message: "Invalid Username/Password",
      });
    }
    return res.json(200, {
      message: "Sign in successfully here is your token please keep it safe",
      success: "true",
      data: {
        user,
        token: jwt.sign(user.toJSON(), "codeial", { expiresIn: 50000000 }),
      },
    });
  } catch (err) {
    console.log("error", err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};
module.exports.signup = async function (req, res) {
  try {
    console.log(req.body);

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.json(409, { message: "User already exists" });
    } else {
      const user = await User.create(req.body, function (err, user) {
        if (err) {
          return res.json(500, { message: "error in creating user" });
        }
        return res.json(200, {
          message:
            "Sign up successfully here is your token please keep it safe",
          success: "true",
          data: {
            user,
            token: jwt.sign(user.toJSON(), "codeial", {expiresIn: 50000000 }),
          },
        });
      });
    }
  } catch (err) {
    console.log("error", err);
    return res.json(500, {
      message: "Internal server error",
    });
  }
};
module.exports.edituser = async function (req, res) {
  try {
    console.log(req.body);
    const { name, password, confirmPassword } = req.body;

    await User.findOneAndUpdate({ _id: req.userId }, { name });
    const user = await User.findById({ _id: req.userId });
    return res.json(200, {
      message: "success",
      data: {
        user,
        token: jwt.sign(user.toJSON(), "codeial", {
          expiresIn: 50000000 ,
        }),
      },
      success: true,
    });
  } catch (err) {
    console.log("error", err);
    return res.json(500, {
      message: "Internal Server Error",
      success: false,
    });
  }
};
module.exports.users = async function (req, res) {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.json("401", {
        message: "no token authorization",
      });
    }
    console.log(req.params.userid);
    const user = await User.findById(req.params.userid);
    if (user) {
      return res.json("200", {
        success: true,
        data: {
          user: user.toJSON(),
        },
        message: "user details found.",
      });
    } else {
      return res.json("404", {
        message: "Error in finding user",
      });
    }
  } catch (err) {
    return res.json(500, {
      message: "Internal server error",
    });
  }
};
module.exports.search = async function (req, res) {
  try {
    const keyword = req.query.text
      ? { name: { $regex: req.query.text, $options: "i" } }
      : "";
    const users = await User.find(keyword);
    if (users) {
      return res.json("200", {
        message: "Found users",
        success: true,
        users: users,
      });
    } else {
      return res.json("200", {
        message: "No user Found",
        success: false,
      });
    }
  } catch (err) {
    return res.json("500", {
      message: `Internal Server Error:${err}`,
    });
  }
};
