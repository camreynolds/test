const jwt = require("jsonwebtoken")

// userSchema
const User = require("../model/userSchema")

const requireAuth = async (req,res,next)=>{
  const {authorization} = req.headers
  console.log("authorization:",authorization);
  

  if(!authorization){
    return res.status(401).json({error: "authorization is required."})
  }

  const token = authorization.split(" ")[1]
  console.log("Token:",token);
  

  try {
    const {_id} = jwt.verify(token,process.env.SECRET)
    console.log("_id:",_id);
    
    req.user = await User.findById({_id}).select("_id")
    console.log("Req user id:",req.user);
    
    next()
  } catch (error) {
    res.status(401).json({error: "invalid authorization."})
  }
}

module.exports = requireAuth