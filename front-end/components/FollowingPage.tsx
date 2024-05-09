import UserFollowing from "@/components/UserFollowing"
import BASE_URL from "@/config";
import { useEffect, useState } from "react";

function FollowingPage({ params }: { params: { pid: string }}) {
    const [followingUsers, setFollowingUsers] = useState<any[]>([]);

    useEffect(() => {
        // console.log("djaskl")
        const fetchFollowingUsers = async () => {
            try {
            const response = await fetch(`/api/whofollow?userid=${params.pid}`, {
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
            setFollowingUsers(responseData.data);
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

    console.log('Following',followingUsers)
    return (
        <div className="flex flex-col w-[100%] bg-white">
                <div className="divide-y">
                    {followingUsers.map((id: number) => (
                        <UserFollowing params={{pid:id.id}} />
                    ))}
                </div>
        </div>
    )
}

export default FollowingPage