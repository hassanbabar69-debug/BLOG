import { get } from "../services/authentication.js";

function checkauth(req,res,next){
    const getit = req.cookies.token;
    if(!getit){
        return next();
    }

    try{

        const user = get(getit);
        req.user = user;




    }
    catch(error){

        

    }

    return next();
}

export default checkauth;