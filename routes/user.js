import express from 'express'
const userrouter = express.Router();
import User from '../model/user.js'



userrouter.get('/signin' , (req,res)=>{

    res.render("Signin")
})
userrouter.get('/signup' , (req,res)=>{

    res.render("Signup")
})
userrouter.post('/signup' , async (req,res)=>{

    const{name,email,password} = req.body;

    await User.create({
        name : name,
        email : email,
        password : password
    })

    res.redirect("/");
})
userrouter.post('/signin' , async(req,res)=>{

    const{email,password} = req.body;

    try{
        const user = await User.matchpassword(email,password);

    
    
        return res.cookie("token" , user).redirect("/");
    }
    catch(error){

        return res.render("Signin" , {
            error: "Incorrect email or password"
        })

    }
   

})


userrouter.get("/logout" , (req,res)=>{
    return res.clearCookie("token").redirect("/");
})

export default userrouter;