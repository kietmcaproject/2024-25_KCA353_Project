import { NextRequest } from "next/server";
import JWT from "jsonwebtoken"

export const getDataFromToken = (request : NextRequest) =>{
    try {
        const token  = request.cookies.get("token")?.value || ""


       const decodedToken:any =  JWT.verify(token, process.env.TOKEN_SECRET_KEY!);

       //from toaken load access he id
       return decodedToken.id;
    } catch (error : any) {
        throw new Error(error);
    }
}