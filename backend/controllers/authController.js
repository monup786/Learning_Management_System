// controllers/authController.js
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../config/token.js";
import sendMail from "../config/sendMail.js";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400).json({ message: "User already exists" });
    // if (validator.isEmail(email)) {
    //   return res.status(400).json({ message: "enter valid email ID" });
    // }
    if(!name || !email || !password || !role){
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Enter strong password and make sure it is at least 8 characters long" });
    }
    let hashedpassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedpassword,
      role,
    });

    let token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({user});
  } catch (error) {
    res.status(500).json({ message: `Sign Up error ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password){
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: "User not found" });

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    let token = await generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 5 * 24 * 60 * 60 * 1000,
      path:"/"
    })
    return res.status(200).json( {user} );
  } catch (error) {
    return res.status(500).json({ message: `Login error ${error}`});
  }
};
export const LogOut=async (req,res) =>{
  try {
    await res.clearCookie("token")
    return res.status(200).json({message:"logout successfully"})
  } catch (error) {
    return res.status(500).json({message:`Log error ${error}`});
  }
}
 //code for OTP send to email
export const sendOTP=async(req,res)=>{
  try {
    const {email}=req.body;
    const user=await User.findOne({email});
    if(!user)
      return res.status(404).json({message:"User not found"});
    // generate OTP
    const otp=Math.floor(1000 + Math.random() * 9000).toString();
    // send OTP to email
    user.resetOtp=otp;
    user.otpExpires=Date.now()+5*60*1000; // OTP expires in 5 minutes
    user.isotpVerified=false;
    await user.save();
    await sendMail(email,otp);
   return res.status(200).json({message:"OTP sent to email successfully"});
  
  } catch (error) {
    return res.status(500).json({message:`Send OTP error ${error}`});
  }
}

// code for verify OTP  

export const verifyOTP=async(req,res)=>{
  try {
    const {email,otp}=req.body;
    const user=await User.findOne({email});
    if(!user || String(user.resetOtp) !== String(otp) || user.otpExpires<Date.now()){
      return res.status(404).json({message:"Invalid OTP "});
    }
    user.isotpVerified=true;
    user.resetOtp=undefined;
    user.otpExpires=undefined;
    await user.save();
    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({message:`Verify OTP error ${error}`});
  }
}

// code for reset password
export const resetPassword=async(req,res)=>{
  try {
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user||!user.isotpVerified){
      return res.status(404).json({message:"OTP verification is required before resetting password"});
    }
    const hashedpassword=await bcrypt.hash(password,10);
    user.password=hashedpassword;
    user.isotpVerified=false;
    await user.save();
    return res.status(200).json({message:"Reset Password successfully"});
  } catch (error) {
    return res.status(500).json({message:`Reset Password error ${error}`});
    
  }
}

export const googleAuth=async(req,res)=>{
  try {
    
    const {name,email,role}=req.body;
    const user=await User.findOne({email});
    if(!user){
      // create new user
      const user=await User.create({
        name,
        email,
        role
      });
    }
      let token=await generateToken(user._id);
      res.cookie("token",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none",
        maxAge:5*24*60*60*1000,
      });
      return res.status(200).json({user});
  } catch (error) {
    return res.status(500).json({message:`Google Auth error ${error}`});
    
  }
}
