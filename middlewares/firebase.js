// firebaseAdmin.js
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');


const path=require("path");
require("dotenv").config();

const serviceAccount = {
  "type": process.env.TYPE,
  "project_id":process.env.PROJECT_ID,
  "private_key_id":process.env.PRIVATE_KEY_ID,
  "private_key": process.env.PRIVATE_KEY,
  "client_email": process.env.CLIENT_EMAIL,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
  "client_x509_cert_url": process.env.CLIENT__X509_CERT_URL,
  "universe_domain": process.env.UNIVERSE_DOMAIN,
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.FIRE_BASE_BUKET,
});

const bucket = admin.storage().bucket();

async function uploadFirebase(file){

    

    try {

        console.log("We are isnide firebase upload function:",file);
          const fileName = `${process.env.FIRE_BASE_FOLDER}/${file.originalname}`;

        const blob=bucket.file(`${process.env.FIRE_BASE_FOLDER}/${file.originalname}`);

        const blobStream=blob.createWriteStream({
         metadata: {
                    contentType: file.mimetype,
                    metadata: {
                            firebaseStorageDownloadTokens: uuidv4(),
                        },
                   },
        });

    return new Promise((resolve,reject)=>{
        blobStream.on("error",(err)=>{
            reject(err);
        });

        blobStream.on("finish",async()=>{

                  const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media&token=${uuidv4()}`;

                 resolve(publicUrl);
        });

        blobStream.end(file.buffer);

    });
        
    } catch (error) {
        console.log("Error in firebase upload =>",error);
        return error;
    }
}

module.exports = uploadFirebase;




