import { BackendHost, BackendProtocol } from "../config/backend-host";
import { AccountTypes } from "../types/account";
import { Metadata } from "../types/meta";

export async function FetchSessionInformation(token: string): Promise<{meta: Metadata, data: AccountTypes}> {
    try{
        const f = await fetch(`${BackendProtocol}://${BackendHost}/auth/me`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
    
        const result: {meta: Metadata, data: AccountTypes} = await f.json()
    
        return result
    } catch {
        throw new Error("Backend Error")
    }
}