import { BackendUrl } from "../config/backend-host"
import { UserResponseTypes } from "../types/account"

export async function FetchAll(): Promise<UserResponseTypes> {
    const f = await fetch(`${BackendUrl}/user`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    const result: UserResponseTypes = await f.json()
    
    return result
}