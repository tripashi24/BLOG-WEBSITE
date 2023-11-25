const {Schema,model}=require('mongoose');
const { error } = require('console');

const blogSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        requirrd:true,
    },
    coverImageURL:{
        type:String,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user", // Ensure it matches the user model name
      },
   
}, {timestamps:true}
);


const Blog=model('blog',blogSchema);
module.exports=Blog;