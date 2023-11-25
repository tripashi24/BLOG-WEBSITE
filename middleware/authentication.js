const { validaToken } = require("../services/authentication");

// function checkForAuthenticationCookie(cookieName){
//     return(req,res,next)=>{
//         const tokenCookieValue=req.cookies[cookieName];
//         if(!tokenCookieValue){
//             return  next();
//         }
//         try{
//             const userPlayload=validaToken(tokenCookieValue);
//             req.user=userPlayload;

            
//         }
//         catch(error){}

//           return   next();
        
//     };
// }
function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
       const tokenCookieValue = req.cookies[cookieName];
       if (!tokenCookieValue) {
          return next();
       }
       try {
          const userPayload = validaToken(tokenCookieValue);
          req.user = userPayload;
          return next();
       } catch (error) {
          // Handle the error, e.g., log it or send an error response
          console.error('Token validation error:', error);
          return next(error);
       }
    };
 }
module.exports={
checkForAuthenticationCookie
};