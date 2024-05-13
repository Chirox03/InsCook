import Image from "next/image"
import Link from 'next/link'
import PostType from '@/types/PostType'
import getRelativeTime from "./DateCalculate"
import { useEffect,useState } from "react"
import { useRouter } from "next/navigation"
interface PostProps {
  post: PostType;
}
const  Post:  React.FC<PostProps> = ({post}) =>{
  const router = useRouter();
  console.log(post)
  const handlePostClick = (e: React.MouseEvent<HTMLDivElement>) =>
  {
    e.preventDefault();
    router.prefetch(`/Post/${post.id}`)
    router.push(`/Post/${post.id}`)
  }
  const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) =>{
    e.preventDefault();
    router.prefetch(`/UserProfile/${post.user.userID}`)
    router.push(`/UserProfile/${post.user.userID}`)
  }
  return (
    <div className="w-full my-2">
        <div className="mt-6">
          <div className="flex flex-row m-2 ml-1 items-start">
            <img className="w-16 h-16 rounded-full" src={post.user.avatar} alt="User Avatar" />
            <div className="ml-2 pt-2 flex font-sans flex-col">
              <div className="text-left font-sans font-semibold text-slate-600 text-md cursor-pointer" onClick={(e)=>handleUserClick(e)}>{post.user.username}</div>
              <div className="text-left font-normal text-xs text-gray-400">{post?.timestamp && new Date(post?.timestamp?.seconds * 1000).toLocaleDateString()}</div>
            </div>
          </div>
          <div className="h-400 rounded-s">
            <img className="w-full h-80" src={post.image||undefined} alt="food image" />
          </div>
          <div className="mt-2 flex flex-row justify-start cursor-pointer" onClick={(e)=>handlePostClick(e)}>
            <div className="flex flex-col mr-2">
              { (post.isLiked===true) ? (<i className="fi fi-sr-heart "></i>) : <i className="fi fi-rr-heart"></i>}
            <span className="text-xs not-italic -mt-2">{post.likes}</span>
            </div>
            <div className="flex flex-col mr-2">
            <i className="fi fi-rr-comment"></i>
            <span className="text-xs not-italic -mt-2">{post.comments}</span>
            </div>
            {post.isSaved===true ? <i className="fi fi-sr-bookmark mr-2"></i> : <i className="fi mr-2fi-rr-bookmark"></i>}
          </div>
          <p className="text-left font-bold text-lg text-slate-600">{post.title}</p>
          <p className="text-left md-2 font-sans">
           {post.caption}
          
          <button type="button" className="ml-2 text-xs underline hover:underline-offset-0"  >
             - See post... -
          </button>
          </p>
        </div>
    </div>
  )
}

export default Post