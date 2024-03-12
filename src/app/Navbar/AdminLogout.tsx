"use client"


interface AdminProps {
    signout: ()=>Promise<void>
}
export default  function AdminLogout({signout}:AdminProps){
     return (
        <>
            <button onClick={ async (e)=>{
                await signout();
                window.location.href = "/adminDashboard"
            }}>
                Log Out
            </button>
        </>
    )
}