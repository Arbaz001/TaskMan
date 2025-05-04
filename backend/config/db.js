import mongoose from "mongoose";
import 'dotenv/config'

export const connectDB =async () => {
    const dbURI = process.env.MONGODB_URI;
    try {
        await mongoose.connect(dbURI);
        console.log("DB Connected");
    } catch (error) {
        console.log("DB Connection Error:", error.message);
    }
}