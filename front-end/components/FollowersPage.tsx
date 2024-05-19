import UserFollow from "@/components/UserFollow"
import BASE_URL from "@/config";
import { useEffect, useState } from "react";


function FollowersPage({ params }: { params: { pid: string }}) {
    const [followersUsers, setFollowersUsers] = useState<any[]>([]);

    useEffect(() => {
        // console.log("djaskl")
        const fetchFollowersUsers = async () => {
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
        
        fetchFollowersUsers()
            .catch((error) => {
            console.error('Error:', error);
            });
    },[params.pid])
    console.log('Followers',followersUsers)
    return (
        <div className="flex flex-col w-[100%] bg-white">
                <div className="divide-y">
                    {followersUsers.map((id: string,index) => (
                        <UserFollow params={{ pid:id}} key={index} />
                    ))}
                </div>
                
        </div>
    )
  }

  export default FollowersPage