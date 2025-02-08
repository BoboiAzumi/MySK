import { useState } from "react"
import logo from "../assets/logo.webp"
import { FetchAuth } from "../utils/fetch-auth"
import { AuthResponseType } from "../types/auth"
import { StoreToken } from "../utils/token"

export function Login(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({} as {status: string, message: string})

    function showError(status: string, message: string){
        const errorState = {
            status: status,
            message: message
        }
        setError(errorState)
        const modal = (document.getElementById("error_modal") as HTMLFormElement)
        modal?.showModal()
    }

    async function submit(ev: React.FormEvent<HTMLFormElement>){
        ev.preventDefault()
        if(username == "" || password == ""){
            return
        }
        try {
            const response: AuthResponseType = await FetchAuth(username, password)
            if(response.meta.status == "SUCCESS"){
                StoreToken(response.data.token)
                document.location.href = "/"
            }
            else{
                showError(response.meta.status, response.meta.message)
            }
        }
        catch (err: unknown) {
            showError("UNEXPECTED_ERROR", (err as Error).message)
        }
    }

    return (
        <div className="flex min-h-[100vh]">
            <div className="bg-[#162f4b] lg:w-[70%] w-full">
            </div>
            <div className="hidden lg:w-[30%] lg:flex flex-col justify-center items-center">
                <img src={logo} alt="Logo" className="w-[5rem] rounded-md" />
                <form className="mt-5 flex flex-col gap-4 w-full lg:px-[20%]" onSubmit={submit}>
                    <input 
                        type="text" 
                        className="input input-bordered w-full"
                        placeholder="Username"
                        value={username}
                        onChange={(ev) => setUsername(ev.target.value.trim())}
                    />
                    <input 
                        type="password" 
                        className="input input-bordered w-full"
                        placeholder="Password" 
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value.trim())}
                    />
                    <input 
                        type="submit" 
                        className="btn btn-outline bg-[#162f4b] text-white w-full"
                    />
                </form>
            </div>
            <div className="lg:hidden fixed bg-white bottom-0 w-full rounded-t-4xl min-h-[80vh] px-5 py-[2rem] flex flex-col justify-center items-center">
                <img src={logo} alt="Logo" className="w-[5rem] rounded-md" />
                <form className="mt-5 flex flex-col gap-4" onSubmit={submit}>
                    <input 
                        type="text" 
                        className="input input-bordered"
                        placeholder="Username"
                        value={username}
                        onChange={(ev) => setUsername(ev.target.value.trim())}
                    />
                    <input 
                        type="password" 
                        className="input input-bordered"
                        placeholder="Password" 
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value.trim())}
                    />
                    <input 
                        type="submit" 
                        className="btn btn-outline bg-[#162f4b] text-white"
                    />
                </form>
            </div>
            <dialog id="error_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{error.status}</h3>
                    <p className="py-4">{error.message}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}