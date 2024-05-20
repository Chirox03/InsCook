import UserFollow from "@/components/UserFollow"
import BASE_URL from "@/config";
import UserType from "@/types/UserType";
import { useEffect, useState } from "react";

function FollowersPage({ params }: { params: { pid: string }}) {
    const [followersUsers, setFollowersUsers    ] = useState<UserType[]>([]);

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
            setFollowersUsers(responseData.data as UserType[]);
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
                    {followersUsers.map((user) => (
                        <UserFollowing key={user.id} user={user}/>

                    ))}
                </div>
                
        </div>
    )
  }

  export default FollowersPage