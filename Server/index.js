const express = require ('express');
const connectDb = require('./config/db');
require('dotenv').config();
const userRoute = require('./routes/user.route')

const app =express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

//mongodb connection
connectDb();
app.use('/user',userRoute)





const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});