'use client';
/* eslint-disable @next/next/no-img-element */
import { ref, getDownloadURL } from 'firebase/storage';
import {storage} from '@/firebase';
import FollowButton from '@/components/FollowButton';
import React, {useState,useEffect} from 'react';
import Link from 'next/link';
import FollowersPage from '../../../components/FollowersPage';
import FollowingPage from '../../../components/FollowingPage';
import { notFound } from 'next/navigation';
import BASE_URL from '@/config';
import UserPosts from '@/components/UserPosts';
import { useAuth } from '@/context/AuthContext';
import Storage from '../Storage/[uid]/page';
import { useRouter } from 'next/navigation';

interface APiUser{
  id:number;
  data: {
    name: string;
    biography: string;
    avatar:string;
  }
}
interface AppUserProfile{
  userID: number;
  data: {
    name: string;
    biography: string;
    avatar:string;
  }
}
const mapUser = async (apiUser: APiUser): Promise<AppUserProfile> => {
  const { id, data} = apiUser;
  // const avatarRef = ref(storage, avatar);
  // const avatarURL = await getDownloadURL(avatarRef);
  // const response = await fetch(avatarURL);
  // const avatarBlob = await response.blob();
  const appUser: AppUserProfile = {
    userID: id,
    data: {
      name: data.name,
      biography: data.biography,
      avatar: data.avatar,
    }
  };

  return appUser;
};

function UserProfile({ params }: { params: { uid: string }}) {
  const router = useRouter();
  const [userProfile,setUserProfile] = useState<AppUserProfile|null|undefined>(undefined);
  // console.log(params.uid)
  useEffect (()=>{
    const fetchProfile = async() =>{
      console.log('meomoe');
      console.log('bruh');
      try{
        // console.log(BASE_URL+`/api/userinfo?userid=${params.uid}`);
        const res = await fetch(BASE_URL+`/api/userinfo?userid=${params.uid}`,
          {method: 'GET',
            headers: {
              'Content-Type': 'application/json', 
            }});
        let data = await res.json();
        data.userID = params.uid;
        console.log(data);
        // console.log(data)

        if(res.ok){
          console.log('???',data);
          setUserProfile(await mapUser(data.data));}
        else {notFound();}
      }
      catch(error){
        console.log('Error fetching user information',error);
        //notFound();
      }
      
    };
    fetchProfile();
  } ,[params.uid]);

  
  // const user: AppUserPro = mapUser(apiUser)
  console.log('Hello',userProfile);
  const [state, setState] = useState(0);
  const {state: auth, dispatch } = useAuth();
  const [yourProfile, setyourProfile] = useState(auth?.id === params.uid);
  // if (auth.id == params.uid)
  //   setyourProfile(true)
  // if(userProfile==null) return notFound();
  // console.log('Auth',auth.id)
  return (
    <div className="my-2 flex flex-col content-center h-full flex-grow overflow-y-auto">
      <div className="mx-5 mb-5">
        <div className="flex my-2">
          <img className='max-h-28 rounded-full overflow-hidden align-left' src={userProfile?.data.avatar} alt="avatar"/>
          <div className="mx-3">
            <h2 className="text-sm font-medium">{userProfile?.data.name}</h2>
            <div className="flex justify-between py-2">
              {yourProfile && (
                <button type="button" className="mb-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-5 py-2 me-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                  <Link href={`/Edit/${params.uid}`}>Edit</Link>
                </button>
              )}
              <FollowButton/>
              <button type="button" className="mb-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-5 py-2 me-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                <Link href={`Storage/${params.uid}`}>Storage</Link>
              </button>
            </div>
          </div>
        </div>
        {/* <h2 className="font-sans text-sm font-medium">{user.hobbies}</h2> */}
        <p className="font-sans text-sm">{userProfile?.data.biography}</p>
      </div>
        
      <div className="inline-flex justify-stretch shadow-sm" role="group">
        <button type="button" className="flex-1 px-4 py-0 font-medium text-gray-900 bg-white border-x-0 border-gray-100  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:border-t-2 focus:border-black   focus:text-slate-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => setState(0)}>   
          {/* <span className="text-xs"> {userProfile?.numpost}</span>
            <br/> */}
          <span className="text-sm ">Posts</span>
        </button>
        <button type="button" className="flex-1 px-4 py-0 font-medium text-gray-900 bg-white border-x-0 border-gray-100 hover:bg-gray-100 hover:text-blue-700 focus:z-10   focus:border-t-2 focus:border-black focus:text-slate-900  focus:text-slate-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => setState(1)}>
          {/* <span className="text-xs"> {userProfile?.numfollowers}</span>
            <br/> */}
          <span className="text-sm ">Followers</span>
        </button>
        <button type="button" className="flex-1 px-4 py-0 font-medium text-gray-900 bg-white border-x-0 border-gray-100  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:border-t-2 focus:border-black   focus:text-slate-900 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white" onClick={() => setState(2)}>
          {/* <span className="text-xs"> {userProfile?.numfollowing}</span>
            <br/> */}
          <span className="text-sm ">Following</span>
        </button>
      </div>
      {state == 0 && <UserPosts params={{ pid:params.uid}}/>}
      {/* {state == 1 && handleStorage()} */}
      {state == 1 && <FollowersPage params={{ pid:params.uid}}/>}
      {state == 2 && <FollowingPage params={{ pid:params.uid}}/>}
      
     
    </div>
  );
}

export default UserProfile;