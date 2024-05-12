'use client'
import Post from "@/components/Post";
import Search from "@/app/Search/page";
import Image from "next/image";
import PostType from "@/types/PostType";
import Navbar from "@/components/NavBar";
import { useEffect ,useState} from "react";
import { useAuth } from "@/context/AuthContext";
import {useRouter} from "next/navigation"
function HomePage() {
  const  [PostList,setPostList] = useState<PostType[]>([]);
  const {state: auth, dispatch } = useAuth();
  const router = useRouter();
  if(auth==null) {
    router.push("/Login")
    return null;}
 useEffect( ()=>{
  const fetchPosts = async () =>{
    try{
      const response = await fetch(`api/home?userID=${auth?.id}`,{
      method: 'GET', // or 'POST', 'PUT', etc.
      headers: {
        'Content-Type': 'application/json', // Example header
        // Add other headers as needed
      }});
      if(response.ok){
        const data = await response.json();
        setPostList(data.data as PostType[])
      }else {
        const data = await response.json();
        console.log(data.message)
      }
    }catch(error)
    {
      console.error('Error fetching posts:', error);

    }
  };
  fetchPosts()
 },[])
 
  return (
    <main className="flex-grow overflow-y-auto pb-20 my-5 text-center max-w-max h-full">
          <h1 className="text-lg mb-4 font-sans">InsCook</h1>
        {/*search components*/ }
        {/* <Search/> */}
        {/* Trending InsCooks */}
        
        <div className="mt-6 p-3 drop-shadow-md border rounded-md">
          <div className="text-left font-sans">Trending InsCooks <button type='button' className="text-gray float-right underline text-xs">See more</button></div>
          
          <div className="flex justify-center mt-2">
            <div className="rounded-full border-2 overflow-hidden">
              <Image src="/image.png" width={100} height={100} alt="avatar" />
            </div>
            <div className="rounded-full border-2 overflow-hidden ml-4">
              <Image src="/image.png" width={100} height={100} alt="avatar" />
            </div>
            <div className="rounded-full border-2 overflow-hidden ml-4">
              <Image src="/image.png" alt="avatar" width={100} height={100} />
            </div>
            <div className="rounded-full border-2 overflow-hidden ml-4">
              <Image src="/image.png" alt="avatar" width={100} height={100} />
            </div>
          </div>
          
        </div>

        {/* Individual Recipe Section */}
        <div className='mt-14 divide-y divide-double'>
            {Array.isArray(PostList) && PostList.map((post) => (
              <Post key={post.id} post={post} />
              ))}
       </div>
    <Navbar/>
    </main>
  )
}

export default HomePage