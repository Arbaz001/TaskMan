import mongoose from "mongoose";

export const connectDB =async () => {
    await mongoose.connect('mongodb://mongo:EKdLfpSgNqYkPwQBIrzevHBiWOyQFDjK@trolley.proxy.rlwy.net:41252')
    .then(()=> console.log("DB Connected"));
}