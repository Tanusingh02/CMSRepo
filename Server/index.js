const express = require ('express');
const connectDb = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const userRoute = require('./routes/user.route')
const pagesRoute=require('./routes/pages.routes')

const categoryRoute = require('./routes/category.routes');

const app =express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//mongodb connection
connectDb();
app.use(cors({
    origin : 'http://localhost:5173',
    credentials: true
}))
app.use('/user',userRoute)
app.use('/categories', categoryRoute)
app.use('/pages',pagesRoute)
//server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

