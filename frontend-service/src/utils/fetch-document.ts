import { BackendUrl } from "../config/backend-host"
import { DocumentFetchResponse, DocumentResponse } from "../types/document"

export async function FetchDocument(limit: number, page: number, q: string): Promise<DocumentResponse> {
    const f = await fetch(`${BackendUrl}/document?limit=${limit}&page=${page}&q=${q}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })

    const result: DocumentFetchResponse = await f.json()
    
    return result.data
}