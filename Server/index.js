const express = require ('express');
const mongoose = require('./config/db');
require('dotenv').config();
const connectDB = require('./config/db');
const pagesroute=require('../Server/routes/pages.routes')
const app =express();

connectDB();
app.use(express.json());
app.use(express.urlencoded);
app.use('/api',pagesroute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
