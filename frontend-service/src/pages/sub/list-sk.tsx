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
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Judul</th>
                                        <th>Jenis</th>
                                        <th>Tahun Ajaran</th>
                                        <th>Semester</th>
                                        <th>Diupload Oleh</th>
                                        <th>Kepada</th>
                                        <th>Tanggal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        documentResponse.map((v:DocumentTypes, i:number) => (
                                            <tr>
                                                <td>{(i + (limit * (page -  1))) + 1}</td>
                                                <td>
                                                    <p className="min-w-[7rem]">{v.title}</p>
                                                </td>
                                                <td>{v.documentType}</td>
                                                <td>{v.academicYear}</td>
                                                <td>{v.semester}</td>
                                                <td>{v.ByUser.fullName}</td>
                                                <td>{v.ToUser.fullName}</td>
                                                <td>{ParseDate(v.createdAt)}</td>
                                                <td>
                                                    <div className="flex flex-col gap-2">
                                                        <button 
                                                            className="btn btn-info"
                                                            onClick={() => {
                                                                setSelectedDocument(i)
                                                                const modal = (document.getElementById("view_modal") as HTMLFormElement)
                                                                modal?.showModal()
                                                            }}
                                                        >View
                                                        </button>
                                                        {account.role != "ADMIN" ?
                                                            v.ToUser.id != v.ByUser.id ? 
                                                            (<></>) : (
                                                                <button className="btn btn-error" onClick={() => deleteDocument(i)}>
                                                                    Delete
                                                                </button>
                                                            )
                                                            : (
                                                                <button className="btn btn-error" onClick={() => deleteDocument(i)}>
                                                                    Delete
                                                                </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
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

            <dialog id="view_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-h-[75vh] overflow-y-auto">
                    <div className="w-full bg-[#f2f2f2] p-4 rounded-md mb-4">
                        <h6 className="font-semibold mb-5 items-center">
                            {documentResponse[selectedDocument]?.title}
                        </h6>
                        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>Jenis</td>
                                        <td>
                                            : {documentResponse[selectedDocument]?.documentType}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Tahun Ajaran
                                        </td>
                                        <td>
                                            : {documentResponse[selectedDocument]?.academicYear}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Semester
                                        </td>
                                        <td>
                                            : {documentResponse[selectedDocument]?.semester}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Diupload oleh
                                        </td>
                                        <td>
                                            : {documentResponse[selectedDocument]?.ByUser.fullName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Kepada
                                        </td>
                                        <td>
                                            : {documentResponse[selectedDocument]?.ToUser.fullName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Tanggal
                                        </td>
                                        <td>
                                            : {ParseDate(documentResponse[selectedDocument]?.createdAt)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h6 className="mt-5 font-semibold">Files</h6>
                        {documentResponse[selectedDocument]?.File.map((file) => (
                            <div className="flex justify-between items-center mb-5 gap-3 overflow-auto">
                                <h6>{file.fileName}</h6>
                                <a href={`${BackendUrl}${file.location}`} target="_blank" className="btn btn-info">Download</a>
                            </div>
                        ))}
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}