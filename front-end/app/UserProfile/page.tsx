"use client"
import Post from "@/components/Post"
import { userAgent } from "next/server"
import FollowButton from "@/components/FollowButton";
import React, {useState} from 'react'
import Link from 'next/link'
import FollowersPage from "../../components/FollowersPage";
import FollowingPage from "../../components/FollowingPage";

interface APiUser{
  id:number;
  name: string;
  hobbies: string;
  description: string;
  numpost: number;
  numfollowers: number;
  numfollowing: number;

}
interface AppUser{
  userID: number;
  name: string;
  hobbies: string;
  description: string;
  numpost: number;
  numfollowers: number;
  numfollowing: number;
}
function mapUser(apiUser: APiUser):AppUser {
  const {id, name, hobbies, description, numpost,numfollowers, numfollowing} = apiUser;
  const appUser: AppUser = {
    userID: id,
    name: name,
    hobbies: hobbies,
    description: description,
    numpost: numpost,
    numfollowers: numfollowers,
    numfollowing: numfollowing,
  };
  return appUser;
}



function UserProfile() {
  const apiUser: APiUser = {
    id: 1,
    name: "Loc Tran",
    hobbies: "sleep",
    description: "do nothing all day",
    numpost: 3,
    numfollowers: 123,
    numfollowing: 321,
  
  }

  const user: AppUser = mapUser(apiUser)
  const [state, setState] = useState(0)
  return (
    <div className="my-2 flex flex-col content-center h-full flex-grow overflow-y-auto">
     <div className="mx-5 mb-5">
        <div className="flex my-2">
        <img className='max-h-28 rounded-full overflow-hidden align-left' src="/image.png" alt="avatar"/>
        <div className="mx-3">
        <h2 className="text-sm font-medium">{user.name}</h2>
        <div className="flex justify-between py-2">
        <button type="button" className="mb-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-5 py-2 me-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            <Link href='/UserProfile/EditProfile'>Edit</Link>
        </button>
        <FollowButton/>
        </div>
        </div>
       </div>
        <h2 className="font-sans text-sm font-medium">{user.hobbies}</h2>
        <p className="font-sans text-xs">{user.description}</p>
        </div>
        
        <div className="inline-flex rounded-md justify-stretch shadow-sm" role="group">
        <button type="button" className="flex-1 px-4 py-0 font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => setState(0)}>   
            <span className="text-xs"> {user.numpost}</span>
            <br/>
            <span className="text-sm ">Posts</span>
        </button>
        <button type="button" className="flex-1 px-4 py-0 font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => setState(1)}>
        <span className="text-xs"> {user.numfollowers}</span>
            <br/>
            <span className="text-sm ">Followers</span>
        </button>
        <button type="button" className="flex-1 px-4 py-0 font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => setState(2)}>
        <span className="text-xs"> {user.numfollowing}</span>
            <br/>
            <span className="text-sm ">Following</span>
        </button>
        </div>
      {state == 0 && <Post/>}
      {state == 1 && <FollowersPage/>}
      {state == 2 && <FollowingPage/>}
      
     
    </div>
  )
}

export default UserProfile