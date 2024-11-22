require("dotenv").config()
const jwt = require("jsonwebtoken")
const User = require("../model/userModel")

const createToken = (id)=>{
  return jwt.sign({id},process.env.SECRET,{expiresIn:"3 d"})
}

const signup = async (req,res)=>{
  const {email,password} = req.body

  try {
    const user = await User.signup(email,password)
    const token = createToken(user.id) 
    res.status(200).json({email,token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const login = async (req,res)=>{
  const {email,password} = req.body

  try {
    const user = await User.login(email,password)
    const token = createToken(user.id)
    res.status(200).json({email,token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = {signup,login}