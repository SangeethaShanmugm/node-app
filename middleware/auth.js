import jwt from 'jsonwebtoken';

export const auth = (request, response, next) => {

// Authorization / x-auth-token
try{
    const token = request.header('x-auth-token');
console.log(token);
jwt.verify(token, process.env.SECRET_KEY);//if does nt match throw error
next();
}catch(err){
    response.status(401) //200 ok
    response.send({err:err.message})
}


}