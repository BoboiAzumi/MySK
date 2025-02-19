import { BackendUrl } from "../config/backend-host"

export async function FetchUpdateUser(userId: number, identifier: string, fullName: string, email: string, phone: string, password: string){
    const f = await fetch(`${BackendUrl}/user/${userId}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            identifier,
            fullName,
            email,
            phone,
            password
        })
    })

    const response = await f.json()

    console.log(response)

    if(response.meta.status != "SUCCESS"){
        return false
    }
    return true
}