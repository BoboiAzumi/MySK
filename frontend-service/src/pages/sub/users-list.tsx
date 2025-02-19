import { useEffect, useState } from "react"
import { Loading } from "../../components/loading"
import { UserWithId } from "../../types/account"
import { BackendUrl } from "../../config/backend-host"
import { FetchAll } from "../../utils/fetch-user"
import { FetchUpdateUser } from "../../utils/fetch-update-user"
import { DeleteUser } from "../../utils/delete-user"

export function UsersList(){
    const [load, setLoad] = useState(false)
    const [users, setUsers] = useState([] as UserWithId[])
    const [selectedUser, setSelectedUser] = useState({} as UserWithId)
    const [selectedUserId, setSelectedUserId] = useState(0)
    const [password, setPassword] = useState("")

    async function FetchUserList(){
        const result = await FetchAll()
        setUsers(result.data as UserWithId[])
        setTimeout(() => setLoad(true), 1000)
    }

    useEffect(() => {
        FetchUserList()
    })

    function confirmDeleteModal(){
        (document.getElementById("confirm_delete_modal") as HTMLDialogElement).show()
    }

    async function deleteUser(){
        const result = await DeleteUser(selectedUserId)

        if(result){
            await FetchUserList()
        }
    }

    async function showEdit(index: number){
        (document.getElementById("edit_modal") as HTMLDialogElement).show()
        setSelectedUser(users[index])
    }

    async function confirmEdit(){
        const result = await FetchUpdateUser(selectedUser.id, selectedUser.identifier as string, selectedUser.fullName, selectedUser.email, selectedUser.phone, password)

        if(result){
            await FetchUserList()
        }
    }

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
                                        <button className="btn btn-ghost btn-xs mx-2" onClick={() => showEdit(i)}>Edit</button>
                                        <button className="btn btn-error btn-xs mx-2" onClick={() => {
                                            setSelectedUserId(v.id)
                                            confirmDeleteModal()
                                        }}>Delete</button>
                                    </th>
                                </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <dialog id="confirm_delete_modal" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg">Yakin ingin menghapus akun ini ?</h3>
                            <p className="py-4">Segala SK yang terkait dengan akun ini akan segera dihapus</p>
                            <div className="modal-action">
                                <form method="dialog" className="flex gap-2">
                                    <button className="btn">Close</button>
                                    <button className="btn btn-error" onClick={() => deleteUser()}>Yes</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                    <dialog id="edit_modal" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg">Edit Akun</h3>
                            <form className="py-4" onSubmit={(ev) => {ev.preventDefault()}}>
                                <h6>Identifier</h6>
                                <input
                                    className="input input-bordered w-full mb-4"
                                    type="text" 
                                    value={selectedUser.identifier}
                                    placeholder="Identifier"
                                    disabled={selectedUser.fullName == "Admin" && selectedUser.email == "admin@mysk" ? true : false}
                                    onChange={(ev) => {
                                        setSelectedUser({
                                            ...selectedUser,
                                            identifier: ev.target.value
                                        })
                                    }}
                                />
                                <h6>Full Name</h6>
                                <input
                                    className="input input-bordered w-full mb-4"
                                    type="text" 
                                    placeholder="Full Name"
                                    value={selectedUser.fullName}
                                    disabled={selectedUser.fullName == "Admin" && selectedUser.email == "admin@mysk" ? true : false}
                                    onChange={(ev) => {
                                        setSelectedUser({
                                            ...selectedUser,
                                            fullName: ev.target.value
                                        })
                                    }}
                                />
                                <h6>Email</h6>
                                <input
                                    className="input input-bordered w-full mb-4"
                                    type="text" 
                                    placeholder="Email"
                                    value={selectedUser.email}
                                    disabled={selectedUser.fullName == "Admin" && selectedUser.email == "admin@mysk" ? true : false}
                                    onChange={(ev) => {
                                        setSelectedUser({
                                            ...selectedUser,
                                            email: ev.target.value
                                        })
                                    }}
                                />
                                <h6>Phone</h6>
                                <input
                                    className="input input-bordered w-full mb-4"
                                    type="text" 
                                    placeholder="Phone"
                                    value={selectedUser.phone}
                                    disabled={selectedUser.fullName == "Admin" && selectedUser.email == "admin@mysk" ? true : false}
                                    onChange={(ev) => {
                                        setSelectedUser({
                                            ...selectedUser,
                                            phone: ev.target.value
                                        })
                                    }}
                                />
                                <h6>Password</h6>
                                <input
                                    className="input input-bordered w-full mb-4"
                                    type="password" 
                                    placeholder="Password"
                                    onChange={(ev) => {
                                        setPassword(ev.target.value)
                                    }}
                                />
                            </form>
                            <div className="modal-action">
                                <form method="dialog" className="flex gap-2">
                                    <button className="btn">Close</button>
                                    <button className="btn btn-info" onClick={() => confirmEdit()}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>) 
                    : 
                (<Loading />)}
        </>
    )
}