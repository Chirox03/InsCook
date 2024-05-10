'use client'
import ImageCarousel from "@/components/ImageCarousel"
import Image from "next/image"
import { useEffect, useState } from "react";
import RecipeType from "@/types/RecipeType";
import { toast } from "react-toastify";
import BASE_URL from "@/config";
import StepType from "@/types/StepType";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
interface APiPost{
  user_id:string;
  title: string;
  comment_number:number;
  like_number:number;
  category:string;
  datetime:Date;
  is_private:boolean;
  caption:string;
  duration: number;
  image:string;
  pax: number;
  ingredients: Array<string>
  step: Array<StepType>;
}

function mapPost(apiPost: APiPost,id:string): RecipeType{
  const post: RecipeType = {
    id: id,
    image: apiPost.image,
    likes: apiPost.like_number,
    comments: apiPost.comment_number,
    title: apiPost.title,
    description: apiPost.caption,
    duration: apiPost.duration,
    category:apiPost.category,
    pax: apiPost.pax,
    ingredients: apiPost.ingredients as Array<string>,
    instructions: apiPost.step,
    user_id :apiPost.user_id
  }
  return post;
}
function PostDetail({ params }: { params: { pid: string }}) {
  // console.log(params.pid)
  const {state: auth, dispatch } = useAuth();
  const [post,setPost] = useState<RecipeType|null>(null)
  const handleLike = async () =>{
    // try{
    //   const res = await fetch(BASE_URL+`/api/like`,{
    //     method: 'GET', 
    //     headers: {
    //       'Content-Type': 'application/json', 
    //     },
    //     body:JSON.stringify({
    //       'userid': auth.id,
    //       'postid':params.pid
    //     })})
    //   const responseData = await res.json();
    //   if(res.ok){
    //     setPost(mapPost(responseData.data as APiPost,params.pid))
    //   }else {
    //     toast.error(responseData.message)
    //   }
    //   }catch(error){
    //     console.error('Error fetching posts:', error);
    //   }

  }

  const handleComment = (link: string) => {
    // Navigate to the specified link
    window.location.href = link;
  };
  const handleSave = async () =>{

  }
  useEffect ( ( )=>{
    const fetchPostbyId = async () =>{
      try{
       
        const res = await fetch(BASE_URL+`/api/posts?id=${params.pid}`,{
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json', 
          }})
        const responseData = await res.json();
        console.log(responseData)
        if(res.ok){
          setPost(mapPost(responseData.data as APiPost,params.pid))
        }else {
          toast.error(responseData.message)
        }
        }catch(error){
          console.error('Error fetching posts:', error);
        }


    }
    fetchPostbyId();
  },[])
  // console.log(post)
  // const post: Post = mapPost(apiPost)
  return (
    <div className="h-full">
        {/* Back button */}
        <div className="fixed top-0 left-0 right-0 flex  justify-between bg-white shadow-md rounded-sm">
        <button type="button" className="flex items-center justify-stretch px-2 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
        <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
       </button>
       <div className="mx-2 mt-2 flex flex-row justify-start">
        <div>
            <i className="fi fi-rr-heart mr-3" onClick={handleLike}> </i>
            <br/>
            <span className="text-xs">{post?.likes}</span>
        </div>
        <div>
            <i className="fi fi-rr-comment mr-3" onClick={() => handleComment(`/Comment/${params.pid}`)}></i>
            <br/>
            <span className="text-xs">{post?.comments}</span>
        </div>
        <div>
        <i className="fi fi-rr-bookmark mr-3"></i>
        </div>
        <div>
        <i className="fi fi-rr-menu-dots mr-2 "></i>
        </div>
        </div>
        </div>
        <div className="h-full mt-16 overflow-y-auto">
        <div className="flex flex-row m-2 ml-1">
            <div className="rounded-full overflow-hidden align-left ">
              <Image src="/image.png" width={50} height={50} alt="avatar" />
            </div>
            <div className="ml-2 flex font-sans flex-col">
              <div className="flex flex-row flex-auto">
                <div>Thuong Le</div>
                <div className="ml-4">5 minutes</div>
              </div>
              <div className="text-left">Cooking blogger</div>
            </div>
          </div>
        <h1 className='text-center font-extrabold text-3xl line-clamp-3'>{post?.title}</h1>
        <div className="my-2">
          <img src={post?.image|| undefined} alt="cover image"></img>
        </div>
        <div>
        <h2 ><span className="text-lg font-semibold">Duration:</span> {post?.duration} minutes</h2> 
        <h2 ><span className="text-lg font-semibold">Method:</span> {post?.category}</h2> 
        <h2 ><span className="text-lg font-semibold">Serve for:</span> {post?.pax} people</h2> 
        </div>
        <div>
        <h2 className="text-lg font-semibold">Ingredients:</h2>
        <ul className='list-disc list-inside'>
        {post?.ingredients?.map((ingredient) => (
           <li>{ingredient}</li>
          ))}

          </ul>
        </div>
        <div>
        <h2 className="text-lg font-semibold">Instruction:</h2>
        <ul className='list-disc list-inside'>
        {post?.instructions?.map((instruction,index) => (
           <li><span className="font-semibold">Step {index+1}:</span> {instruction.content}
           <img src={instruction.image} alt="step image"></img>
           </li>
          ))}

        </ul>
        </div>
        </div>
    </div>
  )
}
export default PostDetail
