export function LoadToken(): string | null {
    const token = localStorage.getItem("token")
    
    if(token == null || token == ""){
        return null
    }

    return token
}

export function StoreToken(token: string){
    localStorage.setItem("token", token)
}

export function ResetToken(){
    localStorage.removeItem("token")
}