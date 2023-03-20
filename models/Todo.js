const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
    },
    task: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150,
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model("Todo", TodoSchema);