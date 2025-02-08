export function MainLayout({children}: {children: React.ReactNode}){
    return (
        <div className="w-full min-h-[100vh]">
            {children}
        </div>
    )
}