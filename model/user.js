import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Model } from "mongoose";
import { create } from "../services/authentication.js";
const {
  randomBytes,createHmac
} = await import ("crypto");

const userschema = new Schema({

    name:{
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    salt:{

        type : String

    },
    password :{
        type : String,
        required : true
    },
    profileimage : {
        type : String,
        default : '/profile/uploads/anonymous-user-icon-circle-shape-vector-18958255.avif'
    },
    role : {
        type : String,
        enum : ["USER" , "ADMIN"],
        default : "USER"
    }

} , {timestamps : true});

userschema.pre("save" , function(next){
    const user = this;
    if(!user.isModified("password")) return;
    const salt = randomBytes(16).toString();
    const hashpass = createHmac("sha256" , salt).update(user.password).digest("hex");

    this.salt = salt;
    this.password = hashpass;

    

})

userschema.static("matchpassword" , async function(email,password){
   const user = await this.findOne({
    email : email
   })

   if(!user) throw new Error("user not found!");
   const salt = user.salt;
   const hashpassword = user.password;
   const hashpass = createHmac("sha256" , salt).update(password).digest("hex");

   if(hashpassword!=hashpass) throw new Error("Incorrect password!");

  const token = create(user);
  return token;



})

const User = mongoose.model("user" , userschema);

export default User;