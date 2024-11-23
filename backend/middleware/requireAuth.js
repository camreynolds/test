require("dotenv").config()
const jwt = require("jsonwebtoken")
const User = require("../model/userModel")

const requireAuth = async(req,res,next)=>{
  const {authorization} = req.headers

  console.log("Authorization:", authorization);
  

  if(!authorization){
    return res.status(401).json({error: "Authorization token required."})
  }

  const token = authorization.split(" ")[1]
  console.log("Token:",token);
  

  try {
    const {_id} = jwt.verify(token,process.env.SECRET)
    console.log("_id:",_id);
    requser = await User.findOne({_id}).select("_id")
    console.log("Requser:",requser);
    req.user = requser
    next()
  } catch ({error}) {    
    res.status(401).json({error: "Request is not authorizated."})
  }
}

module.exports = requireAuth