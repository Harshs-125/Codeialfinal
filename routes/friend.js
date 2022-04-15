const express=require('express');
const router=express.Router();
const friendController=require('../controller/friend_controller');

router.get('/add',friendController.addfriend);

module.exports=router;