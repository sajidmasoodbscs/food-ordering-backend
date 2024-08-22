const mongoose=require("mongoose");


mongoose.connect(process.env.DATABASE_URL,{
}).then((result)=>{
    console.log("#- Database Connected Scuccessfully. -#");
}).catch((error)=>{
    console.log("Database not connected and Error is =>",error);
});