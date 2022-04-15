const express = require("express");
const router = express.Router();
const auth = require("../../../controller/api/middleware/auth");
const userApi = require("../../../controller/api/v1/users_api");

router.post("/createsession", userApi.createSession);
router.post("/signup", userApi.signup);
router.post("/editUser", auth, userApi.edituser);
router.get("/search", auth, userApi.search);
router.get("/:userid", userApi.users);
module.exports = router;
