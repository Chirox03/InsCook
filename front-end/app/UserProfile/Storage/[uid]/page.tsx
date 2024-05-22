'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '@/config';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import PostType from '@/types/PostType';
import Post from '@/components/Post';
export default function Storage({ params }: { params: { uid: string }}){
  // console.log('asjdkasdj',params.uid)
  const {state: auth, dispatch } = useAuth();
  const [posts,setPosts] = useState<PostType[]>([]);
  const router = useRouter();
  useEffect( ()=>{
    const fetchSave = async() => {
      try{
        const response = await axios.get(`${BASE_URL}/api/storage?userid=${params.uid}`);
        setPosts(response.data.data);
        console.log('setPosts');
      }catch(error){
        console.log('Error fetching save',error);
      }
    };
    fetchSave();
  },[]);
  console.log('Post',posts);
  const handleBack = ()=>{
    router.back();
  };
  return (
    <div className="flex flex-col w-[100%] bg-white">
      <div className="fixed px-2 py-2 align-center grid grid-cols-3 sm:left-48 sm:right-48 left-0.5 right-0.5 top-0 bg-white shadow-md rounded-sm">
        <button  onClick={handleBack} type="button" className=" px-2 col-start-1 text-sm text-gray-700 transition-colors duration-200 bg-white rounded-lg w-12 dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 align-left w-12">
          <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
        </button>
        <div className='col-start-2 text-center '>Storage</div>
      </div>
      <div className="mt-14"> 
        {posts.map((post) => (
          <Post key={post.id} post={post}/>
        ))}
                
      </div>
    </div>
  );}  