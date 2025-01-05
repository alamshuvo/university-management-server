
import Jwt from 'jsonwebtoken'
export const createToken =(jwtPayload:Record<string,unknown>,secret:string,expiresIn:string)=>{
   return Jwt.sign(
        jwtPayload,
        secret,
         {expiresIn}
       )
}