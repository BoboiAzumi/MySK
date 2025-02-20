import { useEffect, useState } from "react"
import { Loading } from "../../components/loading"
import { User } from "../../types/account"
import { CreateUser } from "../../utils/create-user"

export function CreateNewUser(){
    const [load, setLoad] = useState(false)
    const [users, setUsers] = useState([] as User[])
    const [process, setProcess] = useState(false)

    useEffect(() => {
        setTimeout(() => setLoad(true), 1000)
    })

    return (
        <>
            {load ? 
                (<div className="p-5 lg:p-10 min-h-[100vh]">
                    <div className="w-full bg-white rounded-md shadow p-3 lg:p-5">
                        <h4 className="text-xl lg:text-2xl font-semibold mb-5">Tambahkan Pengguna</h4>
                        {users.map((v, i) => (
                            <div className="w-full bg-[#f2f2f2] p-4 rounded-md mb-4">
                                <h6>Full Name</h6>
                                <input 
                                    type="text" 
                                    className="input input-bordered w-full mb-4" 
                                    placeholder="Full Name"
                                    value={v.fullName}
                                    onChange={(ev) => {
                                        const usersBefore = [...users]
                                        usersBefore[i].fullName = ev.target.value
                                        setUsers(usersBefore)
                                    }}
                                />
                                <h6>Email</h6>
                                <input 
                                    type="email" 
                                    className="input input-bordered w-full mb-4" 
                                    placeholder="Email"
                                    value={v.email}
                                    onChange={(ev) => {
                                        const usersBefore = [...users]
                                        usersBefore[i].email = ev.target.value
                                        setUsers(usersBefore)
                                    }}
                                />
                                <h6>Phone</h6>
                                <input 
                                    type="text" 
                                    className="input input-bordered w-full mb-4" 
                                    placeholder="Phone"
                                    value={v.phone}
                                    onChange={(ev) => {
                                        const usersBefore = [...users]
                                        usersBefore[i].phone = ev.target.value
                                        setUsers(usersBefore)
                                    }}
                                />
                                <h6>Role</h6>
                                <select className="select mb-4" onChange={(ev) => {
                                        const usersBefore = [...users]
                                        usersBefore[i].role = ev.target.value as "ADMIN" | "DOSEN"
                                        setUsers(usersBefore)
                                }}>
                                    <option value="DOSEN">DOSEN</option>
                                    <option value="ADMIN">ADMIN</option>
                                </select>
                                <h6>Identifier</h6>
                                <input 
                                    type="text" 
                                    className="input input-bordered w-full mb-4" 
                                    placeholder="Identifier"
                                    value={v.identifier}
                                    onChange={(ev) => {
                                        const usersBefore = [...users]
                                        usersBefore[i].identifier = ev.target.value
                                        setUsers(usersBefore)
                                    }}
                                />
                                <h6>Username</h6>
                                <input 
                                    type="text" 
                                    className="input input-bordered w-full mb-4" 
                                    placeholder="Username"
                                    value={v.credential.username}
                                    onChange={(ev) => {
                                        const usersBefore = [...users]
                                        usersBefore[i].credential.username = ev.target.value.toLowerCase()
                                        setUsers(usersBefore)
                                    }}
                                />
                                <h6>Password</h6>
                                <input 
                                    type="password" 
                                    className="input input-bordered w-full mb-4" 
                                    placeholder="Password"
                                    value={v.credential.password}
                                    onChange={(ev) => {
                                        const usersBefore = [...users]
                                        usersBefore[i].credential.password = ev.target.value
                                        setUsers(usersBefore)
                                    }}
                                />
                                <button 
                                    className="btn btn-error"
                                    onClick={() => {
                                        let usersBefore = [...users]
                                        usersBefore = usersBefore.filter((_, idx) => idx != i)
                                        setUsers(usersBefore)
                                    }}
                                >
                                    Delete User
                                </button>
                            </div>
                        ))}
                        
                        <div className="flex justify-between">
                            <button className="btn btn-success" 
                                onClick={
                                    () => {
                                        const usersBefore = [...users]
                                        usersBefore.push({
                                            fullName: "",
                                            email: "",
                                            phone: "",
                                            role: "DOSEN",
                                            identifier: "",
                                            picture: "/uploads/img/person.png",
                                            credential: {
                                                username: "",
                                                password: ""
                                            }
                                        })  
                                    setUsers(usersBefore)
                                }
                            }>Add Users</button>
                            <button className={`btn btn-info ${users.length == 0 ? "hidden":""}`} onClick={
                                () => {
                                    setProcess(true)
                                    CreateUser(users, setUsers).then(() => setProcess(false))
                                }
                            }>{process ? "Processing" : "Submit"}</button>
                        </div>
                    </div>
                </div>) 
                    : 
                (<Loading />)}
        </>
    )
}