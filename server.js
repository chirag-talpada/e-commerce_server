const express=require('express');
const app=express();

const cors=require('cors');

const userRoutes=require('./routes/user.routes')

require('dotenv').config()
const PORT=process.env.SERVER_PORT | 5000;

app.use(express.json());
app.use(cors());

app.use('/api/',userRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT} port`);
})