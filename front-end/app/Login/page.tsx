'use client'
import Image from "next/image"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"
import { toast } from "react-toastify"
import Link from "next/link"
import {auth} from "@/firebase"
import { useAuth } from "@/context/AuthContext"
function Login(){
    const [email,setEmail] = React.useState('')
    const [password,setPassword] = React.useState('')
    const router = useRouter()
    useEffect (()=>{
        setEmail("")
        setPassword("");
    },[])
    const {state: auth, dispatch } = useAuth();
    const handleForm = async (event: React.FormEvent) =>{
        console.log("logining")
        event.preventDefault();
        try{

            const res = await fetch("api/login",
             { method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({'email':email,'password':password})
        })
        const responseData = await res.json();

        if(res.ok){
            toast.success("Log in sucessfully");
            dispatch({type:"LOG_IN",payload:responseData.data.id})
            // console.log(responseData.data,auth)
            router.push('/');
        }else{
            console.log(responseData)
            toast.error(responseData.message);
        }
    } catch(error){
        console.log("Error when logging in",error);
        toast.error("Error when logging in")
    }

    }
    return ( 
        <div className="h-full flex flex-col items-center gap-3 justify-center font-sans overflow-y-hidden w-full">
            <div className="">
            <Image src="/icon.png" width={100} height={100} alt="app-icon"/>
            </div>
            <form onSubmit={(e)=> handleForm(e)} className="mt-5">
                <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Tên người dùng, email/số di động" className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"/>
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Mật khẩu" className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"/>
                <button type="submit" className="w-full text-gray border bg-coral border-gray hover:bg-coral/80 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none ">Đăng nhập</button>
            </form>
            <button type="button" className="py-1 font-light ">Bạn quên mật khẩu ư?</button>
            <button type="button" className="w-full text-blue-500 bg-white hover:bg-slate-200  font-medium rounded-lg px-5  dark:hover:bg-coral focus:outline-none ">
            <Link href={`/SignUp/`}> 
               Tạo tài khoản mới
               </Link></button>
            <h1 className="fixed text-center bottom-5 font-bold">InsCook</h1>
        </div>
    )
}

export default Login