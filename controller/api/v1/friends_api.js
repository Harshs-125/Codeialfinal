const Friendship = require("../../../models/friendship");
const FriendShip = require("../../../models/friendship");
const User = require("../../../models/users");

module.exports.add = async function (req, res) {
  try {
    let from=await User.findById(req.userId);
    let to=await User.findById(req.params.userid);
    let existingfriendship=await FriendShip.findOne({
      from:from,
      to:to
    })
    if(existingfriendship)
    {
      return res.json("200",{
        message:`You are already friend with ${to.name}`
      })
    }
    const friendship=await FriendShip.create({
      from:from,
      to:to
    });
    from.friends.push(friendship);
    to.friends.push(friendship);
    from.save();
    to.save();
    return res.json("200",{
      success:true,
      message:`you are now friend with ${to.name}`,
      data:{
         from:{
           name:from.name,
           email:from.email,
           id:from._id
         },
         to:{
           name:to.name,
           email:to.email,
           id:to._id
         }
      }
    })
  } catch (err) {
    return res.json("500", {
      message: "Internal Server error",
    });
  }
};
module.exports.remove=async function(req,res)
{
  let from=await User.findById(req.userId);
  let to=await User.findById(req.params.userid);
  let existingfriendship=await FriendShip.findOne({
    from:from,
    to:to
  })
  if(existingfriendship)
  {
    from.friends.pull(existingfriendship);
    to.friends.pull(existingfriendship);
    from.save();
    to.save();
    existingfriendship.remove();
    return res.json("200",{
      message:"Removed from friends",
      success:true
    })
  }
  return res.json(500,{
    message:"They are not friends with each other"
  })
}
module.exports.getfriends=async function(req,res)
{
  try{
    let user=await User.findOne({_id:req.userId}).populate({
      path:'friends',
      populate:{
          path:'to',
          select:"name email"
        }
    })
    console.log(user);
    return res.json("200",{
      message:`here are list of friends of user ${user.name}`,
      success:true,
      data:{
        friends:user.friends,
      },
    })
  }catch(err)
  {
    return res.json("500",{
      message:`Internal Server error ${err}`
    });
  }
}
