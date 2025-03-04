import { BackendUrl } from "../config/backend-host"

export async function UpdateConfig(academicYear: string, semester: string){
    const f = await fetch(`${BackendUrl}/config`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            academicYear,
            semester
        })
    })

    const response = await f.json()

    console.log(response)

    if(response.meta.status != "SUCCESS"){
        return false
    }
    return true
}