import { BackendUrl } from "../config/backend-host"
import { Config } from "../types/config"

export async function FetchConfig(): Promise<Config>{
    const f = await fetch(`${BackendUrl}/config`, {
        method: "GET",
        headers: {
            "Content-Type": `application/json`,
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })
    
    const result = await f.json()
        
    return result.data as Config
}