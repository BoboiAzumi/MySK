import { BackendUrl } from "../config/backend-host"

export async function DeleteUser(userId: number){
    const f = await fetch(`${BackendUrl}/user/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": `application/json`,
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    
    await f.json()

    return true
}