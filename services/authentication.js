const JWT=require("jsonwebtoken");
const secret="$superMan@123";
function createTokenforUser(user){
    const playload={
        _id:user.id,
        email:user.email,
        fullname:user.fullname,
        profileImageURL:user.profileImageURL,
        role:user.role,
    };
    const token =JWT.sign(playload,secret);
    return token;
}
function validaToken(token){
    const playload=JWT.verify(token,secret);
    return playload;
}

module.exports={
    createTokenforUser,
    validaToken,
};