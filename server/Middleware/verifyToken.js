require('dotenv').config()
const admin = require('firebase-admin')
const {getAuth}=require('firebase-admin/auth')
let serviceAccount = JSON.parse(process.env.firebase_admin)

// console.log("serviceAccount",serviceAccount)
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const verifyToken = (req,res,next)=>{
    console.log("req.query.token" , req.query.token || req.body.token)
    getAuth().verifyIdToken(req.query.token || req.body.token)
        .then((decoded)=>{
            console.log("----------Cool....!---------")
            req.email = decoded.email
            next()
        }).catch((err)=>{
            console.log("----------Ooops....!---------")
            res.json({message:"Something went wrong...!",success:false})
            console.log(err.message)
        })

}

module.exports = {verifyToken}