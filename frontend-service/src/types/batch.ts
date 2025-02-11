export type FileInformation = {
    file_docs: File,
    documentId: number
}

export type BatchUpload = {
    title: string
    to: number
    files: FileInformation[]
}