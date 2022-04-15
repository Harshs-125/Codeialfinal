const express=require('express');
const router=express.Router();
const passport=require('../config/passport-local-strategy');
const postController=require('../controller/post_controller');

router.post('/createpost',passport.checkAuthentication,postController.createPost);
router.get('/deletepost/:id',passport.checkAuthentication,postController.deletepost);

module.exports=router;