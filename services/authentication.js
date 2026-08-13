import JWT from 'jsonwebtoken'
const secretkey = "!@#$%^&*()" 


function create(user){

    const token = JWT.sign({
        _id : user._id,
        email : user.email,
        profileimage : user.profileimage,
        role : user.role,
    }, secretkey)

    return token;

}

function get(token){
    const gettoken = JWT.verify(token , secretkey);
    return gettoken;
}

export{
    create,
    get
}