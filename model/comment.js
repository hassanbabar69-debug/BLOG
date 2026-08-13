import { Schema , Model } from "mongoose";
import mongoose from "mongoose";

const commentschema = new Schema({

    content:{
        type : String,
        required : true
    },
    blogid:{
         type : Schema.Types.ObjectId,
        ref : "blog"

    },
    createdby : {
        type : Schema.Types.ObjectId,
        ref : "user"
    }



} , {timestamps : true})

const comment = mongoose.model("comment" , commentschema);
export default comment;