import { BackendUrl } from "../config/backend-host"
import { UserWithId } from "../types/account"

export async function FetchUserById(userid: number){
    const f = await fetch(`${BackendUrl}/user/${userid}`, {
        method: "GET",
        headers: {
            "Content-Type": `application/json`,
                "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })
        
    const result = await f.json()
    const user: UserWithId = result.data
            
    return user
}