import { useEffect, useState } from "react"
import { Loading } from "../../components/loading"

export function ChangePassword(){
    const [load, setLoad] = useState(false)
    
    useEffect(() => {
        setTimeout(() => setLoad(true), 1000)
    }, [])

    return (
        <>
            {load ? 
                (<div className="p-5 lg:p-10 min-h-[100vh]">
                    <div className="w-full bg-white rounded-md shadow p-3 lg:p-55">
                    </div>
                </div>) 
                    : 
                (<Loading />)}
        </>
    )
}