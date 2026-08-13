import express from 'express'
const blogrouter = express.Router();
import User from '../model/user.js'
import multer from 'multer';
import path from 'path'
import blog from '../model/blog.js'
import comment from '../model/comment.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./profile/uploads`))
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}- ${file.originalname}`
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

blogrouter.get("/blog" , (req,res)=>{
    res.render("Blog" , {
        user : req.user
    })
})
blogrouter.post("/blog/data",upload.single("coverimage") ,async(req,res)=>{
    const {title , body} = req.body;

    const Blog = await blog.create({

        title:title,
        body : body,
        coverimage : req.file.filename,
        createdby : req.user._id

    })

    return res.redirect(`/blog/${Blog._id}`);


   
    
   
})

blogrouter.get('/blog/:id' , async(req,res)=>{
  const getblog = await blog.findById(req.params.id).populate("createdby");
  const Comments = await comment.find({blogid : req.params.id}).populate("createdby");
  console.log(getblog)

  return res.render("Blogs" , {
    blog : getblog,
    user : req.user,
    comments : Comments
  })
})

blogrouter.post("/comment/:blogid" , async(req,res)=>{

  const Comment = await comment.create({

    content: req.body.text,
    blogid: req.params.blogid,
    createdby: req.user._id

  })

  return res.redirect(`/blog/${req.params.blogid}`)

})
export default blogrouter;


