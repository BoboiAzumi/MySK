/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import { Loading } from "../../components/loading"
import { FetchDocument } from "../../utils/fetch-document"
import { DocumentTypes, PaginationTypes } from "../../types/document"
import { BackendUrl } from "../../config/backend-host"
import { accountContext } from "../../context/account"
import { DeleteDocument } from "../../utils/delete-document"
import { ParseDate } from "../../utils/parse-date"

export function ListSK(){
    const [load, setLoad] = useState(false)
    const [documentResponse, setDocumentResponse] = useState([] as DocumentTypes[])
    const [pagination, setPagination] = useState({} as PaginationTypes)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(5)
    const [selectedDocument, setSelectedDocument] = useState(0)
    const [search, setSearch] = useState("")
    const account = useContext(accountContext)

    async function loadDocument(){
        const df = await FetchDocument(limit, page, search)
        setDocumentResponse(df.documents)
        setPagination(df.pagination)
        setTimeout(() => setLoad(true), 1000);
    }
    
    useEffect(() => {
        loadDocument()
    }, [])

    useEffect(() => {
        if(!load){
            return
        }
        loadDocument()
    }, [limit, page])

    useEffect(() => {
        if(!load){
            return
        }
        loadDocument()
    }, [search])

    function deleteDocument(index: number){
        setSelectedDocument(index)
        console.log(documentResponse[selectedDocument])
        const modal = (document.getElementById("confirm_delete_modal") as HTMLFormElement)
        modal?.showModal()
    }

    async function confirmDelete(id: number){
        if(await DeleteDocument(id)){
            loadDocument()
        }
    }

    return (
        <>
            {load ? 
                (<div className="p-5 lg:p-10 min-h-[100vh]">
                    <div className="w-full bg-white rounded-md shadow p-3 lg:p-5">
                        <h4 className="text-xl lg:text-2xl font-semibold mb-5">Daftar SK</h4>
                        <div className="flex justify-between gap-5">
                            <input type="text" className="input" placeholder="Search" value={search} onChange={(ev) => setSearch(ev.target.value)} />
                            <select className="select mb-5" onChange={(ev) => setLimit(parseInt(ev.target.value))}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                        {
                            documentResponse.map((v:DocumentTypes, i:number) => (
                                <div className="w-full bg-[#f2f2f2] p-4 rounded-md mb-4" key={v.id}>
                                    <h6 className="font-semibold mb-5 items-center">
                                        {v.title}
                                    </h6>
                                    <div className="grid grid-cols-2 grid-flow-row-dense gap-2 lg:w-[50%]">
                                        <h6 className="font-semibold">
                                            Jenis
                                        </h6>
                                        <h6>
                                            : <div className={`badge h-auto badge-success`}>
                                                <h6 className="font-semibold">
                                                    {v.documentType}
                                                </h6>
                                            </div>
                                        </h6>
                                        <h6 className="font-semibold">
                                            Uploaded by
                                        </h6>
                                        <h6>
                                            : {v.ByUser.fullName}
                                        </h6>
                                        <h6 className="font-semibold">
                                            To
                                        </h6>
                                        <h6>
                                            : {v.ToUser.fullName}
                                        </h6>
                                        <h6 className="font-semibold">
                                            Date
                                        </h6>
                                        <h6>
                                            : {ParseDate(v.createdAt)}
                                        </h6>
                                    </div>
                                    <h6 className="mt-5 font-semibold">Files</h6>
                                    {v.File.map((file) => (
                                        <div className="flex justify-between items-center mb-5 gap-3">
                                            <h6>{file.fileName}</h6>
                                            <a href={`${BackendUrl}${file.location}`} target="_blank" className="btn btn-info">Download</a>
                                        </div>
                                    ))}
                                    {account.role != "ADMIN" ?
                                        v.ToUser.id != v.ByUser.id ? 
                                        (<></>) : (
                                            <button className="btn btn-error" onClick={() => deleteDocument(i)}>
                                                Delete Document
                                            </button>
                                        )
                                    : (
                                        <button className="btn btn-error" onClick={() => deleteDocument(i)}>
                                            Delete Document
                                        </button>
                                    )}
                                </div>
                            ))
                        }
                        {documentResponse.length == 0 ? (
                            <h4 className="text-center my-10">Empty</h4>
                        ) : (
                        <>
                            <div className="flex justify-center items-center">
                            {pagination.previous ? (
                                <button className="btn btn-info" onClick={() => setPage(page-1)}>
                                    Previous
                                </button>
                            ) : (<></>)}
                            <h6 className="mx-5">{page}</h6>
                            {pagination.next ? (
                                <button className="btn btn-info" onClick={() => setPage(page+1)}>
                                    Next
                                </button>
                            ) : (<></>)}
                        </div>
                        </>
                        )}
                    </div>
                </div>) 
                    : 
                (<Loading />)
            }
            <dialog id="confirm_delete_modal" className="modal">
                <div className="modal-box">
                    <h3 className="text-lg">Yakin ingin menghapus dokumen <b>{documentResponse.length != 0 ? documentResponse[selectedDocument]?.title ? documentResponse[selectedDocument]?.title : "" : ""}</b></h3>
                    <p className="py-4"></p>
                    <div className="modal-action">
                        <form method="dialog" className="flex gap-2">
                            <button className="btn">Close</button>
                            <button className="btn btn-error" onClick={() => confirmDelete(documentResponse[selectedDocument].id)}>Yes</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}