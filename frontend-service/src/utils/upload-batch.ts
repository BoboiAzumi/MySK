import { BackendUrl } from "../config/backend-host";
import { BatchUpload } from "../types/batch";

export async function UploadBatch(batch: BatchUpload[], setBatch: React.Dispatch<React.SetStateAction<BatchUpload[]>>){
    const success: number[] = []
    await Promise.all(batch.map(async (v: BatchUpload, i: number) => {
        if(v.files.length == 0 || v.title == "" || v.to == -1){
            return
        }

        const createDocument = await fetch(`${BackendUrl}/document`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: v.title,
                to: v.to
            })
        })

        if(createDocument.status != 200){
            return
        }

        const jsonResponse = await createDocument.json()

        if(createDocument){
            v.files.map(async (file) => {
                file.documentId = jsonResponse.data.id

                const data = new FormData()
                data.append("documentId", file.documentId.toString())
                data.append("file_docs", file.file_docs)

                await fetch(`${BackendUrl}/file`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: data
                })
            })
        }

        success.push(i)
    }))

    let batchBefore = [...batch]
    batchBefore = batchBefore.filter((_, idx) => !success.includes(idx))
    setBatch(batchBefore)
}