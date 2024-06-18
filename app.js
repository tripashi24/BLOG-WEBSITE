require("dotenv").config();
const express=require('express');
const   path=require('path')
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const userRoute=require('./routes/user');
const blogRoute=require('./routes/blog');
const { checkForAuthenticationCookie } = require('./middleware/authentication');
const Blog=require("./models/blog");
const app =express();
const port=process.env.PORT|| 5500;

 mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000
 })
 .then((e)=>console.log("mongodb connected"));

 

app.set('view engine','ejs');
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));


app.get('/', async (req, res) => {
  const allBlogs=await Blog.find({}).sort("createdAt");
  res.render('home', {
     user: req.user,
     blogs:allBlogs,
  });
});
 
app.use('/user',userRoute);
app.use('/blog',blogRoute);




app.listen(port,()=>console.log(`server is started at port: ${port}`));


