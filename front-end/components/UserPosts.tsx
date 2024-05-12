import PostDetail from "@/app/Post/[pid]/page";
import BASE_URL from "@/config";
import { useEffect, useState } from "react";


function UserPosts({ params }: { params: { pid: string }}) {
    const [posts, setposts] = useState<any[]>([]);

    useEffect(() => {
        // console.log("djaskl")
        const fetchUserPosts = async () => {
            try {
            const response = await fetch(BASE_URL+`/api/getuserpost?userid=${params.pid}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                },
            });
        
            if (!response.ok) {
                // Handle error response
                const responseData = await response.json();
                console.error(responseData.message);
                return null;
            }
        
            const responseData = await response.json();
            setposts(responseData.data);
            } catch (error) {
            console.error('Error fetching following users:', error);
            return null;
            }
        };
        
        fetchUserPosts()
            .catch((error) => {
            console.error('Error:', error);
            });
    },[])
    // console.log('Posts',posts)
    return (
        <div className="flex flex-col w-[100%] bg-white">
                <div className="divide-y">
                    {posts.map((id: string) => (
                        <PostDetail params={{ pid:id.id}} />
                    ))}
                </div>
                
        </div>
    )
  }

  export default UserPosts