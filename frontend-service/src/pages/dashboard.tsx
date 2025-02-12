
import logo from "../assets/logo.webp"
import { Navbar } from "../components/navbar"
import { AiFillAppstore, AiOutlineArrowLeft, AiOutlineHdd, AiOutlineIdcard, AiOutlineSolution } from "react-icons/ai"
import { ResetToken } from "../utils/token"
import { useState } from "react"
import { SubDashboard } from "./sub/dashboard"
import { useContext } from "react"
import { accountContext } from "../context/account"
import { UploadPage } from "./sub/upload-page"
import { ListSK } from "./sub/list-sk"
import { CreateNewUser } from "./sub/create-user"
import { UsersList } from "./sub/users-list"

export function Dashboard(){
    const [pages, setPages] = useState(1)
    const account = useContext(accountContext)

    return (
        <>
            <div className="drawer lg:drawer-open bg-[#f2f2f2] shadow">
                <input type="checkbox" id="sidebar" className="drawer-toggle" />
                <div className="drawer-content">
                    <Navbar />
                    {pages == 1 ? 
                        (<SubDashboard />) : 
                    pages == 2 ? 
                        (<ListSK />) : 
                    pages == 3 ? 
                        (<UploadPage />) : 
                    pages == 4 ? 
                        (<UsersList/>) : 
                    pages == 5 ? 
                        (<CreateNewUser />) : (<>Not Implemented Yet</>)}
                </div>
                {/* Sidebar */}
                <div className="drawer-side z-40">
                    <label htmlFor="sidebar" className="drawer-overlay"></label>
                    <aside className="bg-base-100 min-h-screen w-80">
                        <div className="bg-base-100 sticky top-0 z-20 items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur flex ">
                            <div className="flex w-full min-h-[10rem] justify-center items-center">
                                <img src={logo} alt="logo" className="rounded-md w-[4rem]" />
                            </div>
                        </div>
                        <ul className="menu px-4 py-0 w-full">
                            <li className="w-full">
                                <a className={`${(pages == 1? "bg-[#2b3440] text-[#d7dde4] " : "")}`} onClick={() => setPages(1)}>
                                    <AiFillAppstore />
                                    Dashboard
                                </a>
                            </li>
                            <li className="w-full">
                                <details className="w-full" open={true}>
                                    <summary className="group">
                                        <AiOutlineSolution />
                                        SK
                                    </summary>
                                    <ul>
                                        <li>
                                            <a className={`${(pages == 2? "bg-[#2b3440] text-[#d7dde4] " : "")}`} onClick={() => setPages(2)}>
                                                Daftar SK
                                            </a>
                                        </li>
                                        <li>
                                            <a className={`${(pages == 3? "bg-[#2b3440] text-[#d7dde4] " : "")}`} onClick={() => setPages(3)}>
                                                Upload SK
                                            </a>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            {account.role == "ADMIN" ? (
                            <li className="w-full">
                                <details className="w-full" open={true}>
                                    <summary className="group">
                                        <AiOutlineIdcard />
                                        Pengguna
                                    </summary>
                                    <ul>
                                        <li>
                                            <a className={`${(pages == 4? "bg-[#2b3440] text-[#d7dde4] " : "")}`} onClick={() => setPages(4)}>
                                                Daftar Pengguna
                                            </a>
                                        </li>
                                        <li>
                                            <a className={`${(pages == 5? "bg-[#2b3440] text-[#d7dde4] " : "")}`} onClick={() => setPages(5)}>
                                                Tambahkan Pengguna
                                            </a>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            ) : (<></>)}
                            <li className="w-full">
                                <details className="w-full" open={true}>
                                    <summary className="group">
                                        <AiOutlineHdd />
                                        Pengaturan Akun
                                    </summary>
                                    <ul>
                                        <li>
                                            <a className={`${(pages == 6? "bg-[#2b3440] text-[#d7dde4] " : "")}`} onClick={() => setPages(6)}>
                                                Ubah Password
                                            </a>
                                        </li>
                                        <li>
                                            <a className={`${(pages == 7? "bg-[#2b3440] text-[#d7dde4] " : "")}`} onClick={() => setPages(7)}>
                                                Ubah Informasi Pengguna
                                            </a>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <li className="w-full">
                                <a 
                                    onClick={() => {
                                        ResetToken()
                                        document.location.href = "/"
                                    }}
                                >
                                    <AiOutlineArrowLeft />
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </aside>
                </div>
            </div>
        </>
    )
}