const mongoose = require('mongoose');
//user schema
const userSchema = new mongoose.Schema({
  fullname : {
    type : String,
    required : true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { 
    type: String,
    required: true,
    enum : ['admin', 'user'], // Assuming roles are 'admin' and 'user'
    default: 'admin', // Default role is 'admin'
  },
  doj:{
    type:Date,
    required: true,
  },
  location:{
    type:String,
    require:true
  },
  age:{
    type:Number,
    required:true
  },
  course:{
    type:String,
    require:true
  }

},{timestamps:true});

const user = mongoose.model('User', userSchema);


module.exports = user;

//joining date 
// location
// age > 22
// course

