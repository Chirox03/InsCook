import UserFollow from "@/components/UserFollow"
import BASE_URL from "@/config";
import { useEffect, useState } from "react";


function FollowersPage({ params }: { params: { pid: string }}) {
    const [followersUsers, setFollowersUsers] = useState<any[]>([]);

    useEffect(() => {
        // console.log("djaskl")
        const fetchFollowingUsers = async () => {
            try {
            const response = await fetch(`/api/follow?userid=${params.pid}`, {
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
            setFollowersUsers(responseData.data);
            } catch (error) {
            console.error('Error fetching following users:', error);
            return null;
            }
        };
        
        fetchFollowingUsers()
            .catch((error) => {
            console.error('Error:', error);
            });
    },[])
    console.log(followersUsers)
    return (
        <div className="flex flex-col w-[100%] bg-white">
                <div className="divide-y">
                    {followersUsers.map((id: number) => (
                        <UserFollow params={{ pid:params.pid}} />
                    ))}
                </div>
                
        </div>
    )
  }

  export default FollowersPage