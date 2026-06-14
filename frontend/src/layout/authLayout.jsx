export default function AuthLayout({children}){
    return (
        <main className="bg-cover flex w-screen justify-center items-center bg-center h-screen" style={{backgroundImage:"url('/background.jpeg')"}}>
            <div className="max-w-[60%]">
                {children}
            </div>
            
        </main>
    )
}