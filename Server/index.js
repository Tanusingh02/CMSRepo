const express = require ('express');
const mongoose = require('./config/db');
require('dotenv').config();
const app =express();







const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});