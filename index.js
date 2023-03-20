const express = require('express');
const cors = require('cors');
const app = express();
const connectDb = require('./db/config');
const dotenv = require("dotenv").config();


app.use(cors());
app.use(express.json());
app.use("/api/todo", require("./Routes/index"));
app.use("/api/user", require("./Routes/index"));


const port = process.env.PORT || 5000;
connectDb();

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})