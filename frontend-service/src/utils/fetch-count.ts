import { BackendUrl } from "../config/backend-host"
import { CountTypes } from "../types/count"

export async function FetchCountDocument(): Promise<CountTypes>{
    const f = await fetch(`${BackendUrl}/document/count`, {
        method: "GET",
        headers: {
            "Content-Type": `application/json`,
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })
    
    const result: CountTypes = await f.json()
        
    return result
}