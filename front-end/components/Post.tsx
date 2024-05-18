import Image from "next/image"
import Link from 'next/link'
import PostType from '@/types/PostType'
import getRelativeTime from "./DateCalculate"
import { useEffect,useState } from "react"
import BASE_URL from "@/config";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation"
import axios from "axios";
import UserType from "@/types/UserType"
interface PostProps {
  post: PostType;
}
const  Post:  React.FC<PostProps> = ({post}) =>{
  const router = useRouter();
  const [newpost, setnewPost] = useState({
    id: post.id,
    user:{
        userID: post.user.userID,
        username: post.user.userID,
        avatar: post.user.userID,
    },
    image:post.image,
    timestamp: post.timestamp,
    title: post.title,
    caption:post.caption,
    likes: post.likes,
    comments: post.comments,
    isSaved: post.isSaved,
    isLiked:post.isLiked,
  });
  const {state: auth, dispatch } = useAuth();
  const [like,setLike] = useState<boolean|null> (null)
  const [save,setSave] = useState<boolean> (null)
  const  [user,setUser] = useState<UserType|null>(null)
  // console.log(post)
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

  useEffect(() => {
  const fetchUserbyId = async (id:String) =>{
      try{
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
    fetchUserbyId(post.user.userID)
  },[])
  // console.log('User ne', user)
  const fetchLike = async() => {
    try{
        const response = await axios.get(`${BASE_URL}/api/like?postid=${post.id}`)
        console.log(response.data)
        setnewPost(prevnewPost => prevnewPost ? { ...prevnewPost, likes: response.data.data.length } : prevnewPost);
        if(response.data.data.find( user => user.id===auth.id))
          setLike(true);
        else setLike(false)
        
    }catch(error){
        console.log("Error fetching like",error)
    }
  }

  const handleLike = async (e:React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    e.currentTarget.disabled=true;
    console.log("like")
    try{
      const response = await axios.put(`${BASE_URL}/api/like`, {
      userid: auth?.id,
      postid: post.id
      });
      console.log("like succesfully")
      
      await fetchLike();
      e.currentTarget.disabled=false;
    }
    catch(error){
      console.error('Error fetching posts:', error);
      toast.error('Error fetching posts:')
      e.currentTarget.disabled=false;
      return null;
    }
  }
  const handleLikeView = (e:React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    e.currentTarget.disabled=true;
    try{
      router.prefetch(`Like/${post.id}`)
      router.push(`Like/${post.id}`)
    }catch(error)
    {
      console.log(error);
      e.currentTarget.disabled=false;
    }
  }

  
  const handleComment = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.disabled=true;
    try{
      router.prefetch(`${BASE_URL}/Post/Comment/${post.id}`)
      router.push(`${BASE_URL}/Post/Comment/${post.id}`)
    }catch(error){
      console.log(error);
      e.currentTarget.disabled=false;
    }
  };

  const fetchSave = async() => {
    try{
        const response = await axios.get(`${BASE_URL}/api/like?userid=${post.user.userID}`)
        // console.log(response.data)
        // setnewPost(prevnewPost => prevnewPost ? { ...prevnewPost, likes: response.data.data.length } : prevnewPost);
        if(response.data.data.find( savepost => savepost.id===post.id))
          setSave(true);
        else setSave(false)
        setnewPost(prevnewPost => prevnewPost ? { ...prevnewPost, isSaved: save } : prevnewPost);
        
    }catch(error){
        console.log("Error fetching save",error)
    }
  }

  const handleSave = async(e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.disabled=true;
    // console.log("save")
    try{
      const response = await axios.put(`${BASE_URL}/api/storage`, {
      userid: auth?.id,
      postid: post.id
      });
      console.log("save succesfully")
      
      await fetchSave();
      e.currentTarget.disabled=false;
    }
    catch(error){
      console.error('Error fetching posts:', error);
      toast.error('Error fetching posts:')
      e.currentTarget.disabled=false;
      return null;
    }
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
          <div className="mt-2 flex flex-row justify-start cursor-pointer" >
            <div className="flex flex-col mr-2">
            <button onClick={(e)=>handleLike(e)}>
              {
                (post.isLiked===false)?
                <i className="fi fi-rr-heart mr-3" > </i>
                :
                <i className="fi fi-sr-heart mr-3"></i>
              }
            </button>
            {/* <br/> */}
              {/* { (post.isLiked===true) ? (<i className="fi fi-sr-heart "></i>) : <i className="fi fi-rr-heart"></i>} */}
            
            </div>
            <div className="flex flex-col mr-2">
            <button onClick={(e) => handleComment(e)}>
              <i className="fi fi-rr-comment"></i>
            </button>
            {/* <span className="text-xs not-italic -mt-2">{post.comments}</span> */}
            </div>
            <div className="flex flex-col mr-2">
            <button onClick={(e) => handleSave(e)}>
              {
                (post.isSaved===true)?
                <i className="fi fi-rr-bookmark mr-3" > </i>
                :
                <i className="fi fi-sr-bookmark mr-3"></i>
              }
            </button>
            </div>
          </div>
          <div className="mt-2 flex flex-row justify-start cursor-pointer" >
          <button onClick={(e)=>handleLikeView(e)}>
              <p className="text-xs not-italic -mt-2">{post.likes} lượt thích</p>
          </button>
          </div>
          <p className="text-left font-bold text-lg text-slate-600">{post.title}</p>
          <p className="text-left md-2 font-sans">
           {post.caption}
          
          <button type="button" className="ml-2 text-xs underline hover:underline-offset-0"  >
            <Link href={`/Post/${post.id}`}>- See post... -</Link>
          </button>
          </p>
        </div>
    </div>
  )
}

export default Post