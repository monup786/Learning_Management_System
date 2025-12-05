import jwt from 'jsonwebtoken';
const isAuth = async(req,res,next) => {
    try {
        
        let {token}=await req.cookies;
    
        if(!token){
            return res.status(400).json({message:"Unauthorized or User doesn't have token"});
        }
        let verifyToken= await jwt.verify(token,process.env.JWT_SECRET);
        if(!verifyToken){
             return res.status(400).json({message:"User doen't have valid token"});
        }
        req.userId= verifyToken.userId
        next();
    } catch (error) {
      return res.status(500).json({message:`isAuth error ${error}`});   
    }
}
export default isAuth;