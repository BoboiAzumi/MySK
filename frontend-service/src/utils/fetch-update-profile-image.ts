import { BackendUrl } from "../config/backend-host"

export async function FetchUpdateProfileImage(img: File){
    const formData = new FormData()

    formData.append("img", img)
    
    const f = await fetch(`${BackendUrl}/user/photo`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: formData
    })

    const response = await f.json()

    console.log(response)

    if(response.meta.status != "SUCCESS"){
        return false
    }
    return true
}