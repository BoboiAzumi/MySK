import { useContext, useEffect, useState } from "react"
import { Loading } from "../../components/loading"
import { accountContext } from "../../context/account"
import { FetchUserById } from "../../utils/fetch-user-by-id"
import { UserWithId } from "../../types/account"
import { FetchUpdateUserInfo } from "../../utils/fetch-update-user-info"
import { FetchUpdateProfileImage } from "../../utils/fetch-update-profile-image"

export function ChangeUserInformation(){
    const [load, setLoad] = useState(false)
    const [user, setUser] = useState({} as UserWithId)
    const [img, setImg] = useState({} as File)
    const account = useContext(accountContext)
    
    async function fetchUser(){
        const fuser = await FetchUserById(account.id)
        setUser(fuser)
        setTimeout(() => setLoad(true), 1000)
    }
    
    useEffect(() => {
        fetchUser()
    }, [])

    async function submit(){
        const update = await FetchUpdateUserInfo(user.fullName, user.email, user.phone)

        if(update){
            document.location.href = "/"
            return
        }
    }

    async function updatePhoto(){
        const update = await FetchUpdateProfileImage(img)

        if(update){
            document.location.href = "/"
            return
        }
    }

    return (
        <>
            {load ? 
                (<div className="p-5 lg:p-10 min-h-[100vh]">
                    <div className="w-full bg-white rounded-md shadow p-3 lg:p-5">
                        <h4 className="text-xl lg:text-2xl font-semibold mb-5">Informasi Akun</h4>
                        <form onSubmit={(ev) => {
                                ev.preventDefault()
                                submit()
                            }}>
                                <h6>Full Name</h6>
                                <input
                                    type="text"
                                    className="input input-bordered w-full mb-4"
                                    placeholder="Full Name"
                                    value={user.fullName}
                                    onChange={
                                        (ev) => {
                                            setUser({...user, fullName: ev.target.value})
                                        }
                                    }
                                    disabled={user.fullName.toLowerCase() == "admin" ? true : false}
                                />
                                <h6>Email</h6>
                                <input
                                    type="email"
                                    className="input input-bordered w-full mb-4"
                                    placeholder="Email@email.com"
                                    value={user.email}
                                    onChange={
                                        (ev) => {
                                            setUser({...user, email: ev.target.value})
                                        }
                                    }
                                    disabled={user.email.toLowerCase() == "admin@mysk" ? true : false}
                                />
                                <h6>Phone</h6>
                                <input
                                    type="text"
                                    className="input input-bordered w-full mb-4"
                                    placeholder="088877665544"
                                    value={user.phone}
                                    onChange={
                                        (ev) => {
                                            setUser({...user, phone: ev.target.value})
                                        }
                                    }
                                />
                                <button type="submit" className="btn btn-info mb-4">Submit</button>
                        </form>
                        <h4 className="text-xl lg:text-2xl font-semibold mb-5">Foto Profil</h4>
                        <form onSubmit={
                            (ev) => {
                                ev.preventDefault()
                                updatePhoto()
                            }
                        } className="block">
                            <input
                                    type="file"
                                    className="file-input input-bordered w-full mb-4"
                                    accept="image/*"
                                    onChange={(ev) => {
                                        if(!ev.target.files?.length){
                                            return
                                        }
                                        setImg(ev.target.files[0])
                                    }}
                                    required 
                                />
                            <button type="submit" className="btn btn-info mb-4">Submit</button>
                        </form>
                    </div>
                </div>) 
                    : 
                (<Loading />)}
        </>
    )
}