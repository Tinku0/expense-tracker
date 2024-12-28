const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./db/connectToDatabase');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const verifyToken = require('./middleware/verifyToken');
require('dotenv').config();

const app = express();
app.use(cors())


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is running on - ", PORT);
    connectToDB();
});
app.use(express.json())
app.use('/auth', userRoutes)
app.use('/expense', verifyToken, expenseRoutes)