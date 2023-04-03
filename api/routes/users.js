const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Actualizar usuario
router.put("/:id", async (req,res)=>{
    try{
        if(req.body.userId === req.params.id || req.body.isAdmin){
            if(req.body.password){
                try
                {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                }
                catch(err)
                {
                  return res.status(500).json(err);
                }
            }
            try{
                const user = await User.findByIdAndUpdate(req.params.id,{
                    $set: req.body,
                });
                res.status(200).json("La cuenta ha sido actualizada")
            }
            catch(err){
                return res.status(500).json(err);
            }
        }
        else{
            return res.status(403).json("Solo puede actualizar su cuenta");
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})
//Eliminar usuario
router.delete("/:id", async (req,res)=>{
    try{
        if(req.body.userId === req.params.id || req.body.isAdmin){
            try{
                const user = await User.findByIdAndDelete({_id: req.params.id});
                res.status(200).json("La cuenta ha sido eliminada")
            }
            catch(err){
                return res.status(500).json(err);
            }
        }
        else{
            return res.status(403).json("Solo puede eliminar su cuenta");
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})
//Consulta un usuario
router.get("/", async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
      const user = userId
        ? await User.findById(userId)
        : await User.findOne({ username: username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//Consulta todos los amigos
router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
  });


//Seguir un usuario
router.put("/:id/follow", async (req, res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: { followers: req.body.userId}});
                await currentUser.updateOne({$push: { followings: req.params.id}});
                res.status(200).json("Siguiendo");
            }else{
                res.status(403).json("Ya sigue la cuenta");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("No puede seguirse a sí mismo");
    }
})
//Dejar de seguir un usuario
router.put("/:id/unfollow", async (req, res)=>{
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: { followers: req.body.userId}});
                await currentUser.updateOne({$pull: { followings: req.params.id}});
                res.status(200).json("Ya no sigue esta cuenta");
            }else{
                res.status(403).json("No sigue esta cuenta");
            }
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("No puede dejar de seguirse a sí mismo");
    }
})

module.exports = router;