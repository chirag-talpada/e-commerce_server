const express=require('express');
const app=express();

const cloudinary=require('cloudinary');
const cors=require('cors');

const userRoutes=require('./routes/user.routes');
const categoryRoutes=require('./routes/category.routes');
const sellerRoutes=require('./routes/seller.routes');
const productRoutes=require('./routes/product.routes');

require('dotenv').config()
const PORT=process.env.SERVER_PORT | 5000;

cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRECT
})

app.use(express.json());
app.use(cors());

app.use('/api/',userRoutes);
app.use('/api/category/',categoryRoutes);
app.use('/api/seller/',sellerRoutes);
app.use('/api/product/',productRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT} port`);
})