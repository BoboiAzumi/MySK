import { BackendUrl } from "../config/backend-host";
import { User } from "../types/account";

export async function CreateUser(users: User[], setUsers: React.Dispatch<React.SetStateAction<User[]>>){
    const success: number[] = []
    await Promise.all(users.map(async (v: User, i: number) => {
        console.log(users)
        if(v.fullName == "" || v.email == "" || v.phone == "" || v.credential.username == "" || v.credential.password == ""){
            console.log("TRIGGER")
            return
        }

        const createUser = await fetch(`${BackendUrl}/user`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...users[i]
            })
        })

        console.log(await createUser.json())

        if(createUser.status != 200){
            return
        }

        success.push(i)
    }))

    let usersBefore = [...users]
    usersBefore = usersBefore.filter((_, idx) => !success.includes(idx))
    setUsers(usersBefore)
}