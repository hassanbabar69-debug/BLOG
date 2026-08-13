import express from 'express'
import userrouter from './routes/user.js';
import path from 'path'
import mongoose from 'mongoose';
import CookieParser from 'cookie-parser';
import checkauth from './middlewares/auth.js'
import blogrouter from './routes/blog.js';
import blog from './model/blog.js'
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();
mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("mongodb connected")})
app.set("view engine" , "ejs")
app.set("views" , "view")
app.use(express.urlencoded({extended:false}))
app.use(CookieParser());

app.use( express.static(path.resolve("./profile/uploads")));
app.use("/profile", express.static(path.resolve("./profile")));
app.use(checkauth)
app.use('/' , userrouter);
app.use('/' , blogrouter);

app.get('/' , async(req,res)=>{

    const allBlogs = await blog.find({});
  
    res.render("Home",
        {
            blogs:allBlogs,
            user : req.user
        }
    )
})


app.listen(PORT, "0.0.0.0", () => {
    console.log("server started");
});