const jwt = require("jsonwebtoken")
const User = require("../model/userSchema")

const requireAuth = async (req,res,next)=>{
  const {authorization} = req.headers

  if(!authorization){
    return res.status(401).json({error: "authorization is required."})
  }
  
  console.log("authorization:",authorization)

  const token = authorization.split(" ")[1]
  console.log("Token:",token)
  

  try {
    const {_id} = jwt.verify(token,process.env.SECRET)
    console.log("Id:",_id)
    
    req.user = await User.findOne({_id}).select("_id")
    console.log("Req user:",req.user)
    
    next()
  } catch (error) {
    res.status(401).json({error: "invalid authorization."})
  }
}

module.exports = requireAuth