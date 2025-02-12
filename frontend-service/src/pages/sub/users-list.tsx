import { useEffect, useState } from "react"
import { Loading } from "../../components/loading"
import { User } from "../../types/account"
import { BackendUrl } from "../../config/backend-host"
import { FetchAll } from "../../utils/fetch-user"

export function UsersList(){
    const [load, setLoad] = useState(false)
    const [users, setUsers] = useState([] as User[])

    async function FetchUserList(){
        const result = await FetchAll()
        setUsers(result.data)
        setTimeout(() => setLoad(true), 1000)
    }

    useEffect(() => {
        FetchUserList()
    })

    return (
        <>
            {load ? 
                (<div className="p-5 lg:p-10 min-h-[100vh]">
                    <div className="w-full bg-white rounded-md shadow p-3 lg:p-5">
                        <h4 className="text-xl lg:text-2xl font-semibold mb-5">Daftar Pengguna</h4>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Full name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {users.map((v, i) => (
                                <tr key={i}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={`${BackendUrl}${v.picture}`}
                                                        alt={`Avatar ${v.fullName}`} />
                                                </div>
                                            </div>
                                        <div>
                                            <div className="font-bold">{v.fullName}</div>
                                                <div className="text-sm opacity-50">{v.identifier}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {v.email}
                                        <br />
                                        <span className={`badge ${v.role == "ADMIN" ? "badge-success" : "badge-info"}`}>{v.role}</span>
                                    </td>
                                    <td>{v.phone}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">Edit</button>
                                    </th>
                                </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>) 
                    : 
                (<Loading />)}
        </>
    )
}