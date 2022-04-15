const Post = require("../../../models/post");
const Comment = require("../../../models/comments");
const User = require("../../../models/users");
const Like = require("../../../models/like");
module.exports.post = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user", { password: 0 })
    .populate("likes", { user: 1, _id: 0 })
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "name email",
      },
    });
  return res.json(200, {
    message: "Lists of Post",
    post: posts,
  });
};
module.exports.deletePost = async function (req, res) {
  try {
    let post = await Post.findById(req.params.id);
    //.id is given by mongoose converting object id into string
    if (post.user == req.user.id) {
      post.remove();
      await Comment.deleteMany({ post: req.params.id });
      //    if(req.xhr)
      //    {
      //        return res.status(200).json({
      //            data:{
      //                post_id:req.params.id
      //            },
      //            message:"post deleted"
      //        })
      //    }
      return res.json(200, {
        message: "Deleted Post",
      });
    } else {
      return res.json(401, {
        message: "You are not allowed to delete this post ",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json(500, {
      message: "internal servererror",
    });
  }
};
module.exports.add = async function (req, res) {
  try {
    const post = await Post.create({
      content: req.body.content,
      user: req.userId,
    });
    if (post) {
      console.log(post);
      return res.json("200", {
        message: "Successfully posted",
        success: true,
        data: {
          post,
        },
      });
    } else {
      return res.json("500", {
        message: "Error in creating post",
      });
    }
  } catch (err) {
    return re.json("500", {
      message: `Internal Server error :${err}`,
    });
  }
};
module.exports.addComment = async function (req, res) {
  try {
    let post = await Post.findById(req.body.postId);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.postId,
        user: req.userId,
      });
      post.comments.push(comment);
      post.save();
      comment = await comment.populate("user", "name email");
      return res.json("200", {
        message: "Comment added Successfully",
        success: true,
        data: {
          comment: comment,
        },
      });
    }
  } catch (err) {
    return res.json("500", {
      message: `Internal Server error: ${err}`,
    });
  }
};
module.exports.toggleLike = async function (req, res) {
  try {
    let likeable;
    let deleted = false;
    if (req.query.likeable_type == "Post") {
      likeable = await Post.findById(req.query.likeable_id).populate("likes");
    } else {
      likeable = await Comment.findById(req.query.likeable_id).populate(
        "likes"
      );
    }
    let like;
    let existingLike = await Like.findOne({
      likeable: req.query.likeable_id,
      onModel: req.query.likeable_type,
      user: req.userId,
    });
    if (existingLike) {
      like = existingLike;
      likeable.likes.pull(existingLike._id);
      likeable.save();
      existingLike.remove();
      deleted = true;
    } else {
      //else make a new like
      let newLike = await Like.create({
        user: req.userId,
        onModel: req.query.likeable_type,
        likeable: req.query.likeable_id,
      });
      likeable.likes.push(newLike._id);
      likeable.save();
      like = newLike;
    }
    await like.populate("user", "name");
    return res.json("200", {
      message: "Request successfull",
      success: true,
      data: {
        deleted,
        like,
      },
    });
  } catch (err) {
    return res.json("500", {
      message: `Internal Server Error :${err} `,
    });
  }
};
