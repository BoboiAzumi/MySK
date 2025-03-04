import { Metadata } from "./meta"

export type UserDocumentTypes = {
    id: number,
    fullName: string,
    email: string,
    phone: string,
    picture: string,
    identifier: string,
    role: "ADMIN" | "DOSEN"
}

export type PaginationTypes = {
    totalItem: number,
    previous: boolean,
    next: boolean
}

export type FileDbTypes = {
    id: number,
    location: string,
    type: string,
    documentId: number,
    fileName: string
}

export type DocumentTypes = {
    id: number,
    title: string,
    by: number,
    to: number,
    documentType: string,
    createdAt: string,
    academicYear?: string,
    semester?: string
    File: FileDbTypes[],
    ByUser: UserDocumentTypes,
    ToUser: UserDocumentTypes
}

export type DocumentResponse = {
    pagination: PaginationTypes,
    documents: DocumentTypes[]
}

export type DocumentFetchResponse = {
    meta: Metadata,
    data: DocumentResponse
}