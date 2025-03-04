import { useEffect, useState } from "react"
import { Loading } from "../../components/loading"
import { Config } from "../../types/config"
import { FetchConfig } from "../../utils/fetch-config"
import { academicYearValidation } from "../../utils/academic-year-validation"
import { UpdateConfig } from "../../utils/update-config"

export function Configuration(){
    const [load, setLoad] = useState(false)
    const [process, setProcess] = useState(false)
    const [config, setConfig] = useState({} as Config)
    const [errorValidation, setErrorValidation] = useState("")

    async function loadConfig(){
        const configuration = await FetchConfig()

        setConfig(configuration)

        setTimeout(() => {
            setLoad(true)
        }, 1000)
    }

    async function submit(){
        if(errorValidation != ""){
            setProcess(false)
            return
        }
        if(!(await UpdateConfig(config.academicYear, config.semester))){
            alert("Error Backend")
            setProcess(false)
            return
        }
        setProcess(false)
    }

    useEffect(() => {
        loadConfig()
    }, [])

    return (
        <>
            {load ? 
                (<div className="p-5 lg:p-10 min-h-[100vh]">
                    <div className="w-full bg-white rounded-md shadow p-3 lg:p-5">
                        <h4 className="text-xl lg:text-2xl font-semibold mb-5">Konfigurasi</h4>
                        <form onSubmit={(ev) => {
                            ev.preventDefault()
                        }}>
                            <h6>Tahun Ajaran</h6>
                            <input 
                                type="text" 
                                className="input input-bordered w-full" 
                                placeholder="Tahun Ajaran"
                                value={config.academicYear}
                                onChange={(ev) => {
                                    setConfig({...config, academicYear: ev.target.value})
                                    academicYearValidation(ev.target.value, setErrorValidation)
                                }}
                            />
                            <h6 className="text-red-500">{errorValidation}</h6>
                            <h6 className="mt-4">Semester</h6>
                            <select className="select mb-4" 
                                defaultValue={config.semester}
                                onChange={(ev) => {
                                    setConfig({...config, semester: ev.target.value})
                                }}
                            >
                                <option value="Ganjil" selected={config.semester == "Ganjil"}>Ganjil</option>
                                <option value="Genap" selected={config.semester == "Genap"}>Genap</option>
                            </select>
                            <div className="flex justify-start">
                                <button className={`btn btn-info`} onClick={
                                    () => {
                                        setProcess(true)
                                        submit()
                                    }
                                }>{process ? "Processing" : "Submit"}</button>
                            </div>
                        </form>
                    </div>
                </div>) 
                    : 
                (<Loading />)}
        </>
    )
}