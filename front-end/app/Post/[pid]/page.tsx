'use client';
/* eslint-disable @next/next/no-img-element */
import ImageCarousel from '@/components/ImageCarousel';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import RecipeType from '@/types/RecipeType';
import { toast } from 'react-toastify';
import BASE_URL from '@/config';
import StepType from '@/types/StepType';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import UserType from '@/types/UserType';
import { useRouter } from 'next/navigation';
import UserProfile from '@/app/UserProfile/[uid]/page';
import DateCalculate from '@/components/DateCalculate';

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
  method:string;
  ingredients: Array<string>
  step: Array<StepType>;
  timestamp:Date;
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
    method:apiPost.method,
    pax: apiPost.pax,
    timestamp:apiPost.timestamp,
    ingredients: apiPost.ingredients as Array<string>,
    instructions: apiPost.step,
    user_id :apiPost.user_id
  };
  return post;
}
function PostDetail({ params }: { params: { pid: string }}) {
  // console.log(params.pid)
  const {state: auth, dispatch } = useAuth();
  const [post,setPost] = useState<RecipeType|null>(null);
  const  [user,setUser] = useState<UserType|null>(null);
  const router = useRouter();
  const [like,setLike] = useState<boolean|null> (null);
  const handleComment = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.disabled=true;
    try{
      router.prefetch(`Comment/${params.pid}`);
      router.push(`Comment/${params.pid}`);
    }catch(error){
      console.log(error);
      e.currentTarget.disabled=false;
    }
  };
  

  useEffect ( ()=>{
    const fetchPostbyId = async () =>{
      try{
        const response = await axios.get(`${BASE_URL}/api/posts?id=${params.pid}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        await fetchUserbyId(response.data.data.user_id);
        setPost(mapPost(response.data.data as APiPost,params.pid));
        await fetchLike();
      }
      catch(error){
        console.error('Error fetching posts:', error);
        toast.error('Error fetching posts:');
        return null;
      }


    };
    const fetchUserbyId = async (id:String) =>{
      try{
        const response = await axios.get(`${BASE_URL}/api/userinfo?userid=${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('User',response.data.data);
        setUser(response.data.data);
        return;
      }
      catch(error){
        console.error('Error fetching posts:', error);
        toast.error('Error fetching posts:');
      }
    };
    if(auth==null) 
    {
      router.push('/Login');
    }
    fetchPostbyId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[params.pid,auth,router]);
  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    router.back();
  };
  const handleUserClick = (e:React.MouseEvent<HTMLDivElement>) =>{
    e.preventDefault();
    router.prefetch(`/UserProfile/${user?.id}`);
    router.push(`/UserProfile/${user?.id}`);
  };
  const fetchLike = async() => {
    try{
      const response = await axios.get(`${BASE_URL}/api/like?postid=${params.pid}`);
      console.log(response.data);
      setPost(prevPost => prevPost ? { ...prevPost, likes: response.data.data.length } : prevPost);
      /* @ts-ignore */
      if(response.data.data.find( user => user.id===auth.id))
      {setLike(true);}
      else {setLike(false);}
        
    }catch(error){
      console.log('Error fetching like',error);
    }
  };
  const handleLike = async (e:React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    e.currentTarget.disabled=true;
    console.log('like');
    try{
      const response = await axios.put(`${BASE_URL}/api/like`, {
        userid: auth?.id,
        postid: params.pid
      });
      console.log('like succesfully');
      
      await fetchLike();
      e.currentTarget.disabled=false;
    }
    catch(error){
      console.error('Error fetching posts:', error);
      toast.error('Error fetching posts:');
      e.currentTarget.disabled=false;
      return null;
    }
  };
  const handleLikeView = (e:React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    e.currentTarget.disabled=true;
    try{
      router.prefetch(`Like/${params.pid}`);
      router.push(`Like/${params.pid}`);
    }catch(error)
    {
      console.log(error);
      e.currentTarget.disabled=false;
    }
  };
  const [showMenu, setShowMenu] = useState(false);
  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  const handleGetSharingLink = () => {
    const sharingLink = `${window.location.origin}/Post/${params.pid}`;
    navigator.clipboard.writeText(sharingLink).then(() => {
      toast.success('Sharing link copied to clipboard!');
    }).catch((err) => {
      toast.error('Failed to copy sharing link.');
    });
    setShowMenu(false);
  };

  const handleEditPost = () => {
    // Implement edit post logic here
    router.prefetch(`Edit/${params.pid}`);
    router.push(`Edit/${params.pid}`);
    setShowMenu(false);
  };

  const handleDeletePost = async () => {
    const userConfirmed = window.confirm('Are you sure you want to delete this post?');
    if (!userConfirmed) {
      return;
    }
    try {
      await axios.delete('/api/posts/', {data:  {postid: params.pid }});
      toast.success('Post deleted successfully');
      router.push('/');
    } catch (error) {
      toast.error('Error deleting post');
    }
    setShowMenu(false);
  };
  console.log('likr',like);
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
            <button onClick={(e)=>handleLike(e)}>
              {
                (like===false)?
                  <i className="fi fi-rr-heart mr-3" > </i>
                  :
                  <i className="fi fi-sr-heart mr-3"></i>
              }
            </button>
            <br/>
            <button onClick={(e)=>handleLikeView(e)}>
              <span className="text-xs p-1 cursor-default" >{post?.likes}</span>
            </button>
          </div>
          <div>
            <button onClick={(e) => handleComment(e)}>
              <i className="fi fi-rr-comment mr-3" ></i>
            </button>
            <br/>
            <span className="text-xs p-1">{post?.comments}</span>
          </div>
          <div>
            <i className="fi fi-rr-bookmark mr-3"></i>
          </div>
          <div>
            <i className="fi fi-rr-menu-dots mr-2" onClick={handleMenuToggle}></i>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleGetSharingLink}
                >
                Get Sharing Link
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleEditPost}
                >
                Edit Post
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-red-100"
                  onClick={handleDeletePost}
                >
                Delete Post
                </button>
              </div>
            )}
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
              <div className="text-md font-semibold cursor-pointer" onClick={(e)=>handleUserClick(e)}>{user?.data.name}</div>
              {/*@ts-ignore */}
              <div className="ml-4">{DateCalculate(post?.timestamp)}</div>
            </div>
            <div className="text-left"></div>
          </div>
        </div>
        <h1 className='my-5 text-center text-gray-900 font-bold break-normal text-3xl md:text-5xl'>{post?.title}</h1>
        <div className="my-2">
          { (post?.image) ?
          /* @ts-ignore */
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
              {post?.ingredients?.map((ingredient,index) => (
                <div key={index}>
                  <a href="#">{ingredient}</a>
                  <hr/>
                </div>
              ))}
            </div>
          </fieldset>
          {/* @ts-ignore */}
          <h2 ><span className="px-2 text-lg font-semibold">Duration: </span> {post?.duration >= 60 ? `${Math.floor(post?.duration / 60)}h${post?.duration % 60 > 0 ? '+' : ''}`
            : `${post?.duration} minutes`} </h2> 
          <h2 ><span className="px-2 text-lg font-semibold">Serve for:</span> {post?.pax} pax</h2> 
        </div>
        <h2 className="px-2 text-lg font-semibold mb-5">Method:</h2>
        <h2 className="px-2 text-lg font-semibold mb-5">Instruction:</h2>
        {post?.instructions?.map((instruction, index) => (
        <div className="mb-5" key={index}>
          <div className="flex space-x-4 items-center mb-2">
            <div className="rounded-full h-8 w-8 bg-coral flex items-center justify-center">
              <span className="text-white text-sm font-bold">{index + 1}</span>
            </div>
            <h2 className="text-lg font-medium text-gray-800">Step {index + 1}</h2>
          </div>
          <p className="mb-2 text-md">
            {instruction.content}
          </p>
          {instruction.image && (
            <img src={typeof instruction.image === 'string' ? instruction.image : URL.createObjectURL(instruction.image)}
            alt="step image"
            />
          )}
        </div>
      ))}

      </div>
    </div>
  );
}
export default PostDetail;
