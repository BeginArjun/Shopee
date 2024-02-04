const getCurrentUser=async(token:string)=>{
    const res=await fetch('http://192.168.137.1:3000/api/user/current',{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`
        }
    })
    const data=await res.json()
    return data
}

export default getCurrentUser