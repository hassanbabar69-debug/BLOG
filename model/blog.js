import { Schema , Model } from "mongoose";
import mongoose from "mongoose";

const userblog = new Schema({

    title:{
        type : String,
        required : true
    },
    body:{
        type : String,
        required : true

    },
    coverimage:{
        type:String
    },
    createdby : {
        type : Schema.Types.ObjectId,
        ref : "user"
    }



} , {timestamps : true})

const blog = mongoose.model("blog" , userblog);
export default blog;