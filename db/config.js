const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/todoapp')
        console.log('-------------Database is connected!-------------')

    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

module.exports = connectDb;