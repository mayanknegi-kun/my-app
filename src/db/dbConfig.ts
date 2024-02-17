import mongoose, { mongo } from "mongoose"

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected',()=>{
            console.log('DB connected successfully')
        })
        connection.on('error',(err)=>{
            console.log('MongoDB connection Error')
        })
    }
    catch(error){
        console.log('Something Went Wrong')
        console.log(error)
    }
}