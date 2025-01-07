const express = require('express');
const cors = require('cors');
const { connectToDB } = require('./config/connectToDatabase');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const profileRoutes = require('./routes/userprofile');
const categoryRoutes = require('./routes/category');
const verifyToken = require('./middleware/verifyToken');
const seedDefaultCategories = require('./utils/setUpCategory');
require('dotenv').config();

const app = express();
app.use(cors())


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("server is running on - ", PORT);
    connectToDB();
    seedDefaultCategories();
});
app.use(express.json())
app.use('/auth', userRoutes)
app.use('/expense', verifyToken, expenseRoutes)
app.use('/profile', verifyToken, profileRoutes)
app.use('/category', verifyToken, categoryRoutes)
