"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Comment from '@/components/Comment'
import CommentType from '@/types/CommentType'
import BASE_URL from "@/config";
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
export default function CommentPage({ params }: { params: { pid: string }}) {


  const handleCommentSubmit = (commentContent:string)=>{
    const newComment: CommentType = {
      id : '123',
      content: commentContent,
      timestamp: new Date(),
      user:{
        userID: '123',
        username: 'Hai Nguyen',
      },
      reply:[]
    }
    setComments([...comments,newComment]);
  };
  const handleKeyPress = (e:React.KeyboardEvent<HTMLInputElement>) =>{
    if (e.key === "Enter"){
      const newComment = (e.target as HTMLInputElement).value.trim();
      if(newComment !== ""){
        handleCommentSubmit(newComment);
        (e.target as HTMLInputElement).value = '';
        console.log('Haha',newComment)
        const createNewComment = async() => {
          const commentData = {
            content: newComment,
            userid: useAuth.id,
            postid: params.cid,
          };
          try {
            const response = await fetch(BASE_URL+`/api/comment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(commentData),
            });
        
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
        
            const responseData = await response.json();
            console.log(responseData.data);
          } catch (error) {
            console.error('Error:', error);
          }
        }
        createNewComment()
      }
    }
  }
  const router = useRouter();

  const [comments,setComments] = useState<Array<CommentType>>([])

  useEffect(() => {
    const fetchComments = async () => {
      try{
        const res = await fetch(BASE_URL+`/api/comment?postid=${params.pid}`,
        {method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
        },
      });

      if(!res.ok) {
        const responseData = await res.json();
        console.error(responseData.message);
        return null;
      }

      const responseData = await res.json();
      setComments(responseData.data);
      } catch (error) {
      console.error('Error fetching following users:', error);
      return null;
      }
    }
    fetchComments()
      .catch((error) => {
        console.error('Error:', error);
        });
  },[])

const handleBack = ()=>{
  router.back();
}

  return (
    <div className='relative'>
        {/* Back bar */}
        <div className="fixed px-2 py-2 align-center grid grid-cols-3 sm:left-48 sm:right-48 left-0.5 right-0.5 top-0 bg-white shadow-md rounded-sm">
        <button onClick={handleBack} type="button" className=" px-2 col-start-1 text-sm text-gray-700 transition-colors duration-200 bg-white rounded-lg w-12 dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 align-left w-12">
        <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
       </button>
        <div className='col-start-2 text-center '>Comment</div>
        </div>
            <div className='mt-14 divide-y divide-double'>
            {comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
              ))}
            </div>
        <div className='fixed bottom-0 p-2 bg-white'>
            <input 
                type="text" 
                className="text-md border-0 focus:border-transparent focus:ring-0 w-full border-t-1 px-2 py-2 rounded-sm h-full" 
                placeholder="Add a comment"
                onKeyDown={handleKeyPress}
            />
        </div>

    </div>
  )
}
