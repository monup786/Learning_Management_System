import mongoose from 'mongoose';
const connectDB=async()=>{
   try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database connection successfully");
   } catch (error) {
      console.log("database connection error");
   }
}
export default connectDB;