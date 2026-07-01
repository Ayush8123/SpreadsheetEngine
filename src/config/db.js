const mongoose= require("mongoose")

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongoDb connected")
    }catch(error){
        console.error("mongoDB connection error !")
        process.exit(1)
    }
}
module.exports=connectDB;