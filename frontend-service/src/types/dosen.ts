import { Metadata } from "./meta"

export type DosenType = {
    id: number,
    fullName: string,
    email: string,
    phone: string,
    picture: string,
    identifier: string,
    role: "DOSEN" | "ADMIN"
}

export type DosenResponseType = {
    meta: Metadata,
    data: DosenType[]
}