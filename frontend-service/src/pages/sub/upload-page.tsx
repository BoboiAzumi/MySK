import { useContext, useEffect, useState } from "react";
import { Loading } from "../../components/loading";
import { BatchUpload, FileInformation } from "../../types/batch";
import { DosenType } from "../../types/dosen";
import { FetchDosen } from "../../utils/fetch-dosen";
import { UploadBatch } from "../../utils/upload-batch";
import { accountContext } from "../../context/account";

export function UploadPage() {
    const [load, setLoad] = useState(false);
    const [batch, setBatch] = useState([] as BatchUpload[]);
    const [dosen, setDosen] = useState([] as DosenType[])
    const [process, setProcess] = useState(false)
    const account = useContext(accountContext)

    async function loadDosen(){
        const dosenFetch = await FetchDosen()
        setDosen(dosenFetch.data)
        setTimeout(() => setLoad(true), 1000);
    }

    useEffect(() => {
        loadDosen()
    }, []);

    return (
        <>
            { load ? 
                <div className="p-5 lg:p-10 min-h-[100vh]">
                    <div className="w-full bg-white rounded-md shadow p-3 lg:p-5 ">
                        <h4 className="text-xl lg:text-2xl font-semibold mb-5">Upload SK</h4>
                        {batch.map((v: BatchUpload, i: number) => (
                            <div className="w-full bg-[#f2f2f2] p-4 rounded-md mb-4">
                                <h6>Title</h6>
                                <input 
                                    type="text" 
                                    className="input input-bordered w-full mb-4" 
                                    placeholder="Title"
                                    value={v.title}
                                    onChange={(ev) => {
                                        const batchBefore = [...batch]
                                        batchBefore[i].title = ev.target.value
                                        setBatch(batchBefore)
                                    }}
                                />
                                {account.role == "ADMIN" ? (
                                    <>
                                        <h6>Dosen</h6>
                                        <select 
                                            className="select select-bordered select-md mb-4"
                                            onChange={(ev) => {
                                                const batchBefore = [...batch]
                                                batchBefore[i].to = parseInt(ev.target.value)
                                                setBatch(batchBefore)
                                            }}
                                        >
                                        <option value={-1}>Select Dosen</option>
                                        {dosen.map((dsn: DosenType) => (
                                            <option value={dsn.id}>{dsn.fullName} ({dsn.identifier})</option>
                                        ))}
                                        </select>
                                    </>
                                ) : (<></>)}
                                <div className="mb-4 bg-white p-4 rounded-sm">
                                    {v.files.map((file, index: number) => (
                                        <div className="flex justify-between items-center mb-2">
                                            <h3>{file.file_docs.name}</h3>
                                            <button 
                                                className="btn"
                                                onClick={() => {
                                                    const batchBefore = [...batch]
                                                    batchBefore[i].files = batchBefore[i].files.filter((_, idx) => idx != index)
                                                    setBatch(batchBefore)
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div
                                    id={`dragfile_${i}`}
                                    className="bg-white w-full h-[10rem] rounded-sm flex justify-center items-center mb-4"
                                    onDragOver={
                                        (ev) => {
                                            ev.preventDefault()
                                            document.getElementById(`dragfile_${i}`)?.classList.add("border")
                                            document.getElementById(`dragfile_${i}`)?.classList.add("border-amber-400")
                                        }
                                    }
                                    onDragLeave={
                                        (ev) => {
                                            ev.preventDefault()
                                            document.getElementById(`dragfile_${i}`)?.classList.remove("border")
                                            document.getElementById(`dragfile_${i}`)?.classList.remove("border-amber-400")
                                        }
                                    }
                                    onDrop={
                                        (ev) => {
                                            ev.preventDefault()
                                            const files = ev.dataTransfer.files;
                                            if(files.length){
                                                const batchBefore = [...batch]
                                                Array.from(files).forEach(file => {
                                                    const allowedTypes = /pdf|doc|docx|xls|xlsx|csv/
                                                    const ext = file.name.split(".")
                                                    if(allowedTypes.test(ext[ext.length - 1])){
                                                        batchBefore[i].files.push({
                                                            file_docs: file,
                                                            documentId: 0
                                                        })
                                                    }
                                                })
                                                setBatch(batchBefore)
                                                document.getElementById(`dragfile_${i}`)?.classList.remove("border")
                                                document.getElementById(`dragfile_${i}`)?.classList.remove("border-amber-400")
                                            }
                                        }
                                    }

                                    draggable
                                >
                                    <input 
                                        type="file" 
                                        className="file-input file-input-bordered" 
                                        value={""}
                                        onChange={(ev) => {
                                            if(ev.target.files){
                                                const batchBefore = [...batch]
                                                batchBefore[i].files.push({
                                                    file_docs: ev.target.files[0],
                                                    documentId: 0
                                                })
                                                setBatch(batchBefore)
                                            }
                                        }}
                                    />
                                </div>
                                <button 
                                    className="btn btn-error"
                                    onClick={() => {
                                        let batchBefore = [...batch]
                                        batchBefore = batchBefore.filter((_, idx) => idx != i)
                                        setBatch(batchBefore)
                                    }}
                                >
                                    Delete Document
                                </button>
                            </div>
                        ))}
                        <div className="flex justify-between">
                            <button className="btn btn-success" onClick={
                                () => {
                                    const batchBefore = [...batch]
                                    batchBefore.push({
                                        title: "",
                                        files: [] as FileInformation[],
                                        to: account.role == "ADMIN" ? 0 : account.id
                                    })
                                    setBatch(batchBefore)
                                }
                            }>Add Documents</button>
                            <button className={`btn btn-info ${batch.length == 0 ? "hidden":""}`} onClick={
                                () => {
                                    setProcess(true)
                                    UploadBatch(batch, setBatch).then(() => setProcess(false))
                                }
                            }>{process ? "Processing" : "Submit"}</button>
                        </div>
                    </div>
                </div>
                : 
                <Loading />
            }
        </>
    )
}
