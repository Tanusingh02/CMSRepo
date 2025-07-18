const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
<<<<<<< HEAD
    process.exit(1);
=======
    
>>>>>>> e11747f0d8864995755ab98004053ea79b5d0ba7
  }
}
module.exports = connectDB;
