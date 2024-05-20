'use client'
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react"
import axios from "axios";
import BASE_URL from "@/config";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import UserType from "@/types/UserType";
export default function LikeView({ params }: { params: { pid: string }}){
    const {state: auth, dispatch } = useAuth();
    const [users,setUsers] = useState<UserType[]>([]);
    const [followers,setFollower] = useState();
    const router = useRouter();
    useEffect( ()=>{
        const fetchFollower = async()=>{
            try{
                const response = await axios.get(`${BASE_URL}/api/follow?useridid=${auth?.id}`)
                setFollower(response.data.data);
                console.log("get follower")
            }catch(error){
                console.log("Error fetching followers",error)
            }
        }
        const fetchLike = async() => {
            try{
                const response = await axios.get(`${BASE_URL}/api/like?postid=${params.pid}`)
                setUsers(response.data.data);
                console.log("setUsers")
            }catch(error){
                console.log("Error fetching like",error)
            }
        }
        fetchLike();
        fetchFollower();
    }, [auth?.id, params.pid])

    console.log(users)
    const handleBack = ()=>{
        router.back();
    }
    const isFollowed = (userId: string) => {
         /*@ts-ignore */
        return followers.some(follower => follower.id === userId);
    };
    const handleFollow = async (id:string) =>{
        try{
            const response = await axios.put(`${BASE_URL}/api/follow`,
                {
                    user1: auth?.id,
                    user2: id
                }
            )
            
        }catch(error){
            console.log("Error when follow user",error)
        }
    }
    return (
             <div className="flex flex-col w-[100%] bg-white">
                 <div className="fixed px-2 py-2 align-center grid grid-cols-3 sm:left-48 sm:right-48 left-0.5 right-0.5 top-0 bg-white shadow-md rounded-sm">
                 <button  onClick={handleBack} type="button" className=" px-2 col-start-1 text-sm text-gray-700 transition-colors duration-200 bg-white rounded-lg w-12 dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 align-left w-12">
                    <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                 </svg>
                 </button>
                 <div className='col-start-2 text-center '>Like</div>
                </div>
                <div className="mt-14"> 
                {users.map((user)=>( user && user.data.avatar && user.data.name ?
                        <div key={user.id} className="p-3 flex mt-2 items-center justify-between border-t cursor-pointer hover:bg-gray-200">
                    <div className="flex items-center">
                        <img className="rounded-full h-10 w-10" src={user.data.avatar} alt="avatar"/>
                            <div className="ml-2 leading-snug text-sm text-gray-900 font-bold">{user.data.name}</div>
                    </div>
                    {
                        user.id===auth?.id ?
                        null:(
                                (!isFollowed(user.id))?
                                <button className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100" onClick={()=> handleFollow(user.id)}>Follow</button>
                                :  <button className="h-8 px-3 text-md font-bold text-blue-400 border border-blue-400 rounded-full hover:bg-blue-100">Followed</button>
                        )
                       
                    }
                   </div>:null
                    )
                )
                }
                </div>
        </div>
)}  