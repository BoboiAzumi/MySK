import { BackendUrl } from "../config/backend-host"

export async function FetchUpdateUserInfo(fullName: string, email: string, phone: string){
    const f = await fetch(`${BackendUrl}/user/info`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fullName,
            email,
            phone
        })
    })

    const response = await f.json()

    console.log(response)

    if(response.meta.status != "SUCCESS"){
        return false
    }
    return true
}