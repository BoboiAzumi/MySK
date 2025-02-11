import { BackendUrl } from "../config/backend-host"
import { AuthResponseType } from "../types/auth"

export async function FetchAuth(username: string, password: string): Promise<AuthResponseType> {
    const f = await fetch(`${BackendUrl}/auth`, {
        method: "POST",
        headers: {
            "Content-Type": `application/json`
        },
        body: JSON.stringify({
            username,
            password
        })
    })

    const result: AuthResponseType = await f.json()
    
    return result
}