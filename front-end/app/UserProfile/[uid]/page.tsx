"use client"
import { ref, getDownloadURL } from "firebase/storage";
import {storage} from "@/firebase"
import FollowButton from "@/components/FollowButton";
import React, {useState,useEffect} from 'react'
import Link from 'next/link'
import FollowersPage from "../../../components/FollowersPage";
import FollowingPage from "../../../components/FollowingPage";
import { notFound } from "next/navigation";
import BASE_URL from "@/config";
interface APiUser{
  id:number;
  name: string;
  biography: string;
  avatar:string;
  numpost: number;
  numfollowers: number;
  numfollowing: number;

}
interface AppUserProfile{
  userID: number;
  name: string;
  avatar:Blob|null;
  description: string;
  numpost: number;
  numfollowers: number;
  numfollowing: number;
}
const mapUser = async (apiUser: APiUser): Promise<AppUserProfile> => {
  const { id, name, biography, avatar, numpost, numfollowers, numfollowing } = apiUser;
  // const avatarRef = ref(storage, avatar);
  // const avatarURL = await getDownloadURL(avatarRef);
  // const response = await fetch(avatarURL);
  // const avatarBlob = await response.blob();
  const appUser: AppUserProfile = {
      userID: id,
      name: name,
      description: biography,
      avatar: null, // Save avatar as Blob
      numpost: numpost,
      numfollowers: numfollowers,
      numfollowing: numfollowing,
  };

  return appUser;
}




function UserProfile({ params }: { params: { uid: string }}) {
  // const apiUser: APiUser = {
  //   id: 1,
  //   name: "Loc Tran",
  //   description: "do nothing all day",
  //   numpost: 3,
  //   numfollowers: 123,
  //   numfollowing: 321,
  
  // }
  const [userProfile,setUserProfile] = useState<AppUserProfile|null|undefined>(undefined);
  console.log(params.uid)
  useEffect (()=>{
    const fetchProfile = async() =>{
      console.log("meomoe")
      try{
        // console.log(BASE_URL+`/api/userinfo?userid=${params.uid}`);
        const res = await fetch(BASE_URL+`/api/userinfo?userid=${params.uid}`,
        {method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
        }})
        let data = await res.json();
        data.userID = params.uid;
       if(res.ok){
        setUserProfile(await mapUser(data.data));}
        else notFound();
      }
      catch(error){
        console.log("Error fetching user information",error);
        //notFound();
      }
      
    }
    fetchProfile();
  } ,[])
  
  // const user: AppUserPro = mapUser(apiUser)
  console.log(userProfile)
  const [state, setState] = useState(0)
  // if(userProfile==null) return notFound();
  return (
    <div className="my-2 flex flex-col content-center h-full flex-grow overflow-y-auto">
     <div className="mx-5 mb-5">
        <div className="flex my-2">
        <img className='max-h-28 rounded-full overflow-hidden align-left' src={userProfile?.avatar instanceof Blob ? URL.createObjectURL(userProfile.avatar):"/image.png"} alt="avatar"/>
        <div className="mx-3">
        <h2 className="text-sm font-medium">{userProfile?.name}</h2>
        <div className="flex justify-between py-2">
        <button type="button" className="mb-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-5 py-2 me-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            <Link href={`/Edit/${params.uid}`}>Edit</Link>
        </button>
        <FollowButton/>
        </div>
        </div>
       </div>
        {/* <h2 className="font-sans text-sm font-medium">{user.hobbies}</h2> */}
        <p className="font-sans text-sm">{userProfile?.description}</p>
        </div>
        
        <div className="inline-flex justify-stretch shadow-sm" role="group">
        <button type="button" className="flex-1 px-4 py-0 font-medium text-gray-900 bg-white border-x-0 border-gray-100  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:border-t-2 focus:border-black   focus:text-slate-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => setState(0)}>   
            <span className="text-xs"> {userProfile?.numpost}</span>
            <br/>
            <span className="text-sm ">Posts</span>
        </button>
        <button type="button" className="flex-1 px-4 py-0 font-medium text-gray-900 bg-white border-x-0 border-gray-100 hover:bg-gray-100 hover:text-blue-700 focus:z-10   focus:border-t-2 focus:border-black focus:text-slate-900  focus:text-slate-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => setState(1)}>
        <span className="text-xs"> {userProfile?.numfollowers}</span>
            <br/>
            <span className="text-sm ">Followers</span>
        </button>
        <button type="button" className="flex-1 px-4 py-0 font-medium text-gray-900 bg-white border-x-0 border-gray-100  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:border-t-2 focus:border-black   focus:text-slate-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => setState(2)}>
        <span className="text-xs"> {userProfile?.numfollowing}</span>
            <br/>
            <span className="text-sm ">Following</span>
        </button>
        </div>
      {/* {state == 0 && <Post/>} */}
      {state == 1 && <FollowersPage/>}
      {state == 2 && <FollowingPage/>}
      
     
    </div>
  )
}

export default UserProfile