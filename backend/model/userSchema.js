const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
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

// signup method
userSchema.statics.signup = async function(email,password){
  if(!email || !password){
    throw Error("All the fields must be filled in.")
  }

  if(!validator.isEmail(email)){
    throw Error("you must use a valid email.")
  }

  if(!validator.isStrongPassword(password)){
    throw Error("you must use a stong password.")
  }

  const exist = await this.findOne({email})

  if(exist){
    throw Error("this email is already in use.")
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password,salt)

  const user = await this.create({email,password:hash})

  return user
}

userSchema.statics.login = async function(email,password){
  if(!email || !password){
    throw Error("all the fields must be filled in.")
  }

  if(!validator.isEmail(email)){
    throw Error("you must use a valid email.")
  }

  const user = await this.findOne({email})

  if(!user){
    throw Error("this email is not registered.")
  }

  const match = await bcrypt.compare(password, user.password)

  if(!match){
    throw Error("incorrect password.")
  }

  return user
}


module.exports = mongoose.model("User", userSchema)