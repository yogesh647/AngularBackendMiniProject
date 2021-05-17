const express=require("express");
const app=express();

// call to mongoose
const mongoose=require("mongoose");

//call to env
const dotenv=require("dotenv");
dotenv.config();

// token verify
const cors=require("cors");

//connected db

mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true ,useUnifiedTopology: true },()=>console.log("connected to db"));
// import route
const listingRoutes=require('./routes/listing');
const userRoutes=require('./routes/user');

app.use(express.json());
app.use(cors());
//app.use(express.json());
// user middleware
app.use("/api/listing",listingRoutes);
app.use("/api/user",userRoutes);

// cros are use


app.listen(4000,()=>console.log("your server number is 4000!"));
