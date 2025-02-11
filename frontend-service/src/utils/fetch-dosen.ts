import { BackendUrl } from "../config/backend-host"
import { DosenResponseType } from "../types/dosen"

export async function FetchDosen(): Promise<DosenResponseType> {
    const f = await fetch(`${BackendUrl}/user?role=DOSEN`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    const result: DosenResponseType = await f.json()
    
    return result
}