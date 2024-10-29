import axios from "axios";
import { FirebaseUserObject } from "../contexts/UserProviderContext";

export async function CreateUser(user : FirebaseUserObject) {
    const userObject = user
    const newUser = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/create-user`,{ userObject })

    console.log("new User created" , newUser)
}