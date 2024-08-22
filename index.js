const express=require("express");
const cors=require("cors");
require("dotenv").config();

const db=require("./config/db");

const app=express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT=process.env.PORT;
const HOST=process.env.HOST;

app.listen(PORT,()=>{
    console.log(`Server is ruuning on http://${HOST}:${PORT}`);
});