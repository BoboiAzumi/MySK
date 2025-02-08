import { useEffect, useState } from "react"
import { AccountTypes } from "../types/account"
import { FetchSessionInformation } from "../utils/fetch-session-information"
import { LoadToken, ResetToken } from "../utils/token"
import { Metadata } from "../types/meta"
import { MainLayout } from "../layout/main-layout"
import { Loading } from "../components/loading"
import { Login } from "./login"
import { accountContext } from "../context/account"
import { Dashboard } from "./dashboard"

export function Index(){
    const [account, setAccount] = useState({} as AccountTypes)
    const [isLogin, setIsLogin] = useState(false)
    const [load, setLoad] = useState(false)

    function setLoading(){
        setTimeout(() => setLoad(true), 1000)
    }

    useEffect(() => {
        const token = LoadToken()
        if(token){
            const accountInfo = FetchSessionInformation(token)
            accountInfo.then((value: {meta: Metadata, data: AccountTypes}) => {
                if(value.meta.status == "SUCCESS"){
                    setAccount(value.data)
                    setIsLogin(true)
                }
                else {
                    ResetToken()
                }
                setLoading()
            }).catch((err: unknown) => {
                alert((err as Error).message)
            })
        }
        setLoading()
    }, [])

    return (
        <>
            {
                load ? (
                    <>
                        {
                            isLogin ? 
                            (
                                <accountContext.Provider value={account}>
                                    <MainLayout>
                                        <Dashboard />
                                    </MainLayout>
                                </accountContext.Provider>
                            )
                            : 
                            (
                                <Login />
                            )
                        }
                    </>
                ) : (
                    <MainLayout>
                        <Loading />
                    </MainLayout>
                )
            }
        </>
    )
}