/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
import { useEffect, useState } from "react";
import UserType from "@/types/UserType";
interface UserProps{
    user:UserType
}
const UserFollow:  React.FC<UserProps> = ({user}) =>{
    console.log(user)
    return (
    <div className="flex items-center justify-between border rounded p-[1rem]">
            <div className="flex">
            <img className="w-16 h-16 rounded-full" src={user.data.avatar} alt="User Avatar" />
            
            <div className="ml-[10px] mt-[15px] flex justify-between flex-col">
                <p>{user.data.name}</p>
            </div>
            </div>
            <button type="button" className="flex justify-end mb-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-5 py-2 me-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Delete
            </button>
        </div>
    )
}
export default UserFollow
