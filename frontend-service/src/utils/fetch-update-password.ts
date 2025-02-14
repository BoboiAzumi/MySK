import { BackendUrl } from "../config/backend-host"

export async function FetchUpdatePassword(password: string, newPassword: string){
    const f = await fetch(`${BackendUrl}/user/password`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password,
            newPassword
        })
    })

    const response = await f.json()

    console.log(response)

    if(response.meta.status != "SUCCESS"){
        return false
    }
    return true
}