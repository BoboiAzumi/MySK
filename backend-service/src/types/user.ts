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
    credential: Credential
}