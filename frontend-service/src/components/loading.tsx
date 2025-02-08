import logo from "../assets/logo.webp"

export function Loading(){
    return (
        <div className="flex justify-center items-center min-h-[100vh]">
            <img src={logo} alt="icon" className="w-30 rounded-md animate-bounce" />
        </div>
    )
}