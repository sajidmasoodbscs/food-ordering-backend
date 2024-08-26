const User=require("../models/userModel");
const firebaseUpload=require("../middlewares/firebase");
const multerUpload=require("../middlewares/multer");
require("dotenv").config();

exports.product=(req,res)=>{
 const a=3;
    console.log(a)
}


exports.registerUser=(req,res)=>{

    console.log("Request data after")

    multerUpload.single("image")(req,res,async (error)=>{

         console.log("Request data after file upload in local",req.body)
        if(error){
            console.log("When error in file upload=>",error)
            return res.status(400).json({ErrorInMulterUpload:error});
        }

        if(!req.file){
            console.log("When error in file upload=>",error)
           return res.status(400).json({ErrosIs:"Profile image not uploaded"}); 
        }

        try {

            const file=req.file;

            const fireBaseUrl=await firebaseUpload(file);

            console.log("fireBaseUrl",fireBaseUrl);

            return res.status(200).json({Message:"Sucess",URL:fireBaseUrl});
        } catch (error) {
            console.log("Error in user registarion",error);
            return res.status(500).json({ErrosIs:error});
        }
    });
}

exports.userLogin=(req,res)=>{

res.status(200).send({Message:"Login user api called."})
}