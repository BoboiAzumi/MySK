import { useEffect, useState } from "react"
import { Loading } from "../../components/loading"
import { FetchCountDocument } from "../../utils/fetch-count"
import { CountTypes } from "../../types/count"
import { AiOutlineSolution } from "react-icons/ai"

export function SubDashboard(){
    const [load, setLoad] = useState(false)
    const [count, setCount] = useState({} as CountTypes)

    async function loadCount(){
        const countF = await FetchCountDocument();
        setCount(countF)
        setTimeout(() => setLoad(true), 1000)
    }
    
    useEffect(() => {
        loadCount()
    }, [])

    return (
        <>
            {load ? 
                (<div className="p-5 lg:p-10 min-h-[100vh]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-flow-row-dense gap-5">
                        <div className="w-full bg-white rounded-md shadow p-3 lg:p-5 flex flex-col items-center justify-center min-h-[20rem]">
                            <AiOutlineSolution size={100} />
                            <h2 className="mt-10 text-4xl">{count.data.count}</h2>
                        </div>
                    </div>
                </div>) 
                    : 
                (<Loading />)}
        </>
    )
}