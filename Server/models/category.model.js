const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: true,
        unique:true
    },
    type: {
        type: String,
        required: true,
        trim:true,
    },
    desc: {
        type: String,
        required: true,
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Category", categorySchema)