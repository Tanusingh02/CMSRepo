const jwt = require('jsonwebtoken');

const verifyToken =(req,res,next)=>{
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({ error : 'Access denied'});

    try{
        const decoded = jwt.verify(token, 'your-secret-key');
        req.userId = {
            userId : decoded.userId,
            role : decoded.role
        };
        next();  
    }catch(error){
        res.status(401).json({error: 'Invalid token'});
    }
}
//this is for admin verification
const verifyAdmin = (req,res,next)=>{
    if(!req.userId || req.userId.role !== "admin"){
        return res.status(403).json({message : 'Access Forbidden: Admins only'});
    }
    next();
}

module.exports - { verifyToken, verifyAdmin}