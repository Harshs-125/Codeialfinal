const express = require("express");
const router = express.Router();
const postApi = require("../../../controller/api/v1/post_api");
const auth = require("../../../controller/api/middleware/auth");
router.get("/", postApi.post);
router.delete(
  "/deletepost/:id",
  auth,
  postApi.deletePost
);
router.post("/add", auth, postApi.add);
router.post("/addcomment",auth,postApi.addComment);
router.post("/likes/toggle",auth,postApi.toggleLike);
module.exports = router;
