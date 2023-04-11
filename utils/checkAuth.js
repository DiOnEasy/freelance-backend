import jwt from 'jsonwebtoken';

export default (req, res, next) => {
const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

if(token){
    try{
        const decodedToken = jwt.verify(token, 's')
        

        req.userId = decodedToken._id;
        // console.log(req.userId)
        next();
    }catch(err){
        return res.status(403).json({
            message: "There is no success"
        })
    }
}else{
    return res.status(403).json({
        message: "There is no success"
    })
}

}