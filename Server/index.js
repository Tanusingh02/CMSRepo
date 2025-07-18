const express = require ('express');
<<<<<<< HEAD
const mongoose = require('./config/db');
require('dotenv').config();
const connectDB = require('./config/db');
const pagesroute=require('../Server/routes/pages.routes')
const app =express();

connectDB();
app.use(express.json());
app.use(express.urlencoded);
app.use('/api',pagesroute);
=======
const connectDb = require('./config/db');
require('dotenv').config();
const userRoute = require('./routes/user.route')

const app =express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

//mongodb connection
connectDb();
app.use('/user',userRoute)




>>>>>>> e11747f0d8864995755ab98004053ea79b5d0ba7

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
<<<<<<< HEAD
});
=======
});
>>>>>>> e11747f0d8864995755ab98004053ea79b5d0ba7
