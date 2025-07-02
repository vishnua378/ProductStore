const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db.js');

const productRoutes = require("./routes/product.route.js");

dotenv.config()
const app = express();
const PORT =process.env.PORT || 5000

app.use(express.json());
app.use("/api/products",productRoutes);



app.listen(PORT,() =>{
    connectDB();
    console.log("Sever started at http://localhost:"+PORT); 
});

