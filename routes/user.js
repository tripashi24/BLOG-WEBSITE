const express = require("express");
const { Router } = express;
const router = Router();
const User = require('../models/user');

router.get('/signin', (req, res) => {
    return  res.render('signin');
});

router.get('/signup', (req, res) => {
      return  res.render('signup');
});
router.post("/signin", async(req,res)=>{
    const {email,password} =req.body;
   try{

    const token= await User.matchedPasswordAndGenerateToken(email,password);
   return res.cookie('token',token).redirect("/");
   }
   catch(error){
    return res.render('signin',{
    error:"INCORRECT PASSWORD",
   });
    }
});
router.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/");
})

router.post('/signup', async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        await User.create({
            fullname,
            email,
            password,
        });
        return res.redirect("/");
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send("Error creating user");
    }
});

module.exports = router;