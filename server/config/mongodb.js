import mongoose, { mongo } from "mongoose";

const connnectDB = async ()=>{

    mongoose.connection.on('connected', ()=>{
        console.log("Database Connected")
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/imagify`)
}

export default  connnectDB