/*
express -
mongoose - connect with database
jsonwebtoken - Authentication
bcrypt - encrypt user data store in database
cors - use to connect frontend with backend
dotenv - use environment variable in our project
body-parser - parser data which is coming from the user
multer - images tool system
stripe - for payment gateway
validator - to check whether the password is valid or not
nodemon - when we save our project server will be restarted
*/

import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"



//app config
const app=express()
const port=4000

// middleware
app.use(express.json())
app.use(cors())

//db connection
connectDB();

//api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))

app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})


// mongodb+srv://admin:4558@cluster0.krnb0.mongodb.net/?