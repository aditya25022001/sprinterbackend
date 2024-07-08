import mongoose from "mongoose";
import { config } from "dotenv";

config();

const connectDB = async() => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected : ${connection.connection.host}`);
    }
    catch(error){
        console.log(`Error connecting to mongoDB : ${error.message}`);
    }
}

export default connectDB;