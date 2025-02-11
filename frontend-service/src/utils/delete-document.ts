import { BackendUrl } from "../config/backend-host"

export async function DeleteDocument(id: number){
    const f = await fetch(`${BackendUrl}/document`, {
        method: "DELETE",
        headers: {
            "Content-Type": `application/json`,
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            id
        })
    })
    
    await f.json()

    return true
}