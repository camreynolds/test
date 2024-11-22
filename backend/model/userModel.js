const bcrypt = require("bcrypt")
const validator = require("validator")
const mongoose = require ("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  }
},{timestamps: true})

//static login method
userSchema.statics.login = async function(email,password){
  if(!email || !password){
    throw Error("All the fields must be filled in.")
  }

  if(!validator.isEmail(email)){
    throw Error("Yout must use a valid email")
  }

  const user = await this.findOne({email})

  if(!user){
    throw Error("This email is not registered.")
  }

  const match = await bcrypt.compare(password,user.password)

  if(!match){
    throw Error("Incorrect password.")
  }

  return user
}

//static signup method
userSchema.statics.signup = async function(email,password){
  
  if(!email || !password){
    throw Error("All the fields must be filled in")
  }
    
  if(!validator.isEmail(email)){
    throw Error("You must use a valid email.")
  }
  
  if(!validator.isStrongPassword(password)){
    throw Error("You must use a strong password.")
  }
  
  const exist = await this.findOne({email})
  
  if(exist){
    throw Error("This email is already in use.")
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password,salt)
  const user = await this.create({email,password:hash})

  return user
}

module.exports = mongoose.model("User", userSchema)