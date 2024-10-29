import axios from "axios";
import { FirebaseUserObject } from "../contexts/UserProviderContext";
import { CreateUser } from "./CreateUser";


export async function IsUserExist(user : FirebaseUserObject ){
    console.log("IsExistedUserCalled")
    
    const isExist = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/check-user/${user.uid}`)
    console.log("user Exist checker" , isExist.data)

    if(isExist.data.exist){
        console.log("User already existed")
    }else{
        await CreateUser(user)
    }
}