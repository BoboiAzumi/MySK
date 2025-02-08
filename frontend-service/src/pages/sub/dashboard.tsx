import { useEffect, useState } from "react"
import { Loading } from "../../components/loading"

export function SubDashboard(){
    const [load, setLoad] = useState(false)
    
    useEffect(() => {
        setTimeout(() => setLoad(true), 2000)
    }, [])

    return (
        <>
            {load ? 
                (<a></a>) 
                    : 
                (<Loading />)}
        </>
    )
}