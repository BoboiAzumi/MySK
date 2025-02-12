import { Metadata } from "./meta"

export type AccountTypes = {
    id: number,
    fullName: string,
    picture: string,
    role: string,
    iat: number,
    exp: number
}

export type Credential = {
    username: string,
    password: string
}

export type User = {
    fullName: string,
    email: string,
    phone: string,
    picture: string,
    role: "ADMIN" | "DOSEN"
    credential: Credential,
    identifier?: string
}

export type UserResponseTypes = {
    meta: Metadata,
    data: User[]
}