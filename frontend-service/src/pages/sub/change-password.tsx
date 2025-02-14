import { useEffect, useState } from "react"
import { Loading } from "../../components/loading"
import { FetchUpdatePassword } from "../../utils/fetch-update-password"

export function ChangePassword(){
    const [load, setLoad] = useState(false)
    const [pswd, setPswd] = useState({
        password: "",
        newPassword: ""
    } as {
        password: string
        newPassword: string
    })
    const [isNotMatch, setIsNotMatch] = useState(false)
    
    useEffect(() => {
        setTimeout(() => setLoad(true), 1000)
    }, [])

    useEffect(() => {
        if(pswd.newPassword == ""){
            return
        }
        if(pswd.newPassword != pswd.password){
            setIsNotMatch(true)
            return
        }
        setIsNotMatch(false)
    }, [pswd])

    async function submit(){
        if(pswd.newPassword != pswd.password){
            return
        }

        const updatePswd = await FetchUpdatePassword(pswd.password, pswd.newPassword)

        if(!updatePswd){
            (document.getElementById("failed") as HTMLDialogElement).showModal()
            return
        }
        (document.getElementById("success") as HTMLDialogElement).showModal()
    }

    return (
        <>
            {load ? 
                (<div className="p-5 lg:p-10 min-h-[100vh]">
                    <div className="w-full bg-white rounded-md shadow p-3 lg:p-5">
                        <h4 className="text-xl lg:text-2xl font-semibold mb-5">Ubah Password</h4>
                        <form onSubmit={(ev) => {
                            ev.preventDefault()
                            submit()
                        }}>
                            <h6>New Password</h6>
                            <input
                                type="password"
                                className="input input-bordered w-full mb-4"
                                placeholder="New Password"
                                value={pswd.password}
                                onChange={
                                    (ev) => {
                                        setPswd({...pswd, password: ev.target.value})
                                    }
                                }
                                required
                            />
                            <h6>Confirm New Password</h6>
                            <input
                                type="password"
                                className="input input-bordered w-full mb-4"
                                placeholder="Confirm New Password"
                                value={pswd.newPassword}
                                onChange={
                                    (ev) => {
                                        setPswd({...pswd, newPassword: ev.target.value})
                                    }
                                }
                                required
                            />
                            <h6 className={`text-error mb-4 ${isNotMatch ? "" : "hidden"}`}>Password doesn't match</h6>
                            <button type="submit" className="btn btn-success">
                                Submit
                            </button>
                        </form>
                    </div>
                    <dialog id="failed" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg">Gagal mengubah password</h3>
                            <p className="py-4"></p>
                            <div className="modal-action">
                                <form method="dialog" className="flex gap-2">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                    <dialog id="success" className="modal">
                        <div className="modal-box">
                            <h3 className="text-lg">Berhasil mengubah password</h3>
                            <p className="py-4"></p>
                            <div className="modal-action">
                                <form method="dialog" className="flex gap-2">
                                    <button className="btn">Close</button>
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