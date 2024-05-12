'use client'
import ImageCarousel from "@/components/ImageCarousel"
import Image from "next/image"
import { useEffect, useState } from "react";
import RecipeType from "@/types/RecipeType";
import { toast } from "react-toastify";
import BASE_URL from "@/config";
import StepType from "@/types/StepType";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import UserType from "@/types/UserType";
import { useRouter } from "next/navigation";

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
    timestamp:null,
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
  const  [user,setUser] = useState<UserType|null>(null)
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

  const router = useRouter()
  const handleComment = (link: string) => {
    // Navigate to the specified link
    window.location.href = link;
  };
  if(auth==null) 
    {
      router.push("/Login");
      return null;
    }

  useEffect ( ( )=>{
    const fetchPostbyId = async () =>{
      try{
          const response = await axios.get(`${BASE_URL}/api/posts?id=${params.pid}`, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          await fetchUserbyId(response.data.data.user_id);
          setPost(mapPost(response.data.data as APiPost,params.pid))
        }
        catch(error){
          console.error('Error fetching posts:', error);
          toast.error('Error fetching posts:')
          return null;
        }


    }
    const fetchUserbyId = async (id:String) =>{
      try{
        console.log("id:",id)
        const response = await axios.get(`${BASE_URL}/api/userinfo?userid=${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log("User",response.data.data);
        setUser(response.data.data);
        return;
      }
      catch(error){
        console.error('Error fetching posts:', error);
        toast.error('Error fetching posts:')
      }
    }
    fetchPostbyId();
  },[])
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    router.back();
  }
  
  console.log(post)
  // const post: Post = mapPost(apiPost)
  return (
    <div className="h-full">
        {/* Back button */}
        <div className="fixed top-0 left-0 right-0 flex  justify-between bg-white shadow-md rounded-sm">
        <button onClick={(e) => handleBack(e)} type="button" className="flex items-center justify-stretch px-2 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
        <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
       </button>
       <div className="mx-2 mt-2 flex flex-row justify-start">
        <div>
            <i className="fi fi-rr-heart mr-3" onClick={handleLike}> </i>
            <br/>
            <span className="text-xs p-1">{post?.likes}</span>
        </div>
        <div>
            <i className="fi fi-rr-comment mr-3" onClick={() => handleComment(`/Comment/${params.pid}`)}></i>
            <br/>
            <span className="text-xs p-1">{post?.comments}</span>
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
              {
                (user?.data.avatar)?
                <Image src={user?.data.avatar} width={70} height={70} alt="avatar" />
                : null
              }
            </div>
            <div className="ml-2 flex font-sans flex-col">
              <div className="flex flex-row flex-auto py-4 px-2">
                <div className="text-md">{user?.data.name}</div>
                <div className="ml-4">{post?.timestamp && new Date(post?.timestamp?.seconds * 1000).toLocaleDateString()}</div>
              </div>
              <div className="text-left"></div>
            </div>
          </div>
        <h1 className='my-5 text-center text-gray-900 font-bold break-normal text-3xl md:text-5xl'>{post?.title}</h1>
        <div className="my-2">
          { (post?.image) ?
            <img src={post?.image}  className="w-full h-400" alt="cover image"priority={true}></img> 
            : null
          }
        </div>
        <p className="text-xl md:text-2xl mb-2">{post?.description}</p>
        <div>
        <fieldset className="text-lg w-max border-4 border-coral rounded-lg p-2">
    <legend className="px-2 text-lg font-semibold underline decoration-2"> Ingredients
    </legend>
    <div className="flex flex-col gap-2 px-2 text-base">
        {post?.ingredients?.map((ingredient) => (
          <div>
        <a href="#">{ingredient}</a>
        <hr/>
            </div>
          ))}
    </div>
</fieldset>
        <h2 ><span className="px-2 text-lg font-semibold">Duration: </span> {post?.duration >= 60
      ? `${Math.floor(post?.duration / 60)}h${post?.duration % 60 > 0 ? '+' : ''}`
      : `${post?.duration} minutes`} </h2> 
        <h2 ><span className="px-2 text-lg font-semibold">Serve for:</span> {post?.pax} pax</h2> 
        </div>
        
        <h2 className="px-2 text-lg font-semibold">Instruction:</h2>
        {post?.instructions?.map((instruction,index) => (
        <div>
        <div className="flex space-x-4 items-center">
          <div className="rounded-full h-6 w-6 bg-coral flex items-center justify-center">
            <span className="text-white text-sm font-bold">{index+1}</span>
          </div>
          <h2 className="text-lg font-medium text-gray-800">Step {index+1}</h2>
          </div>
          <p className="">
            {instruction.content}
            </p> 
            <img src={instruction.image} alt="step image"></img>
        </div>
          ))}
        </div>
    </div>
  )
}
export default PostDetail
