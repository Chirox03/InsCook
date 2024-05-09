import Image from "next/image"
import { useEffect, useState } from "react";

interface APiUser{
    id:number;
    name: string;
    realname: string;
  
  }
interface AppUser{
userID: number;
name: string;
realname: string;
}
function mapUser(apiUser: APiUser):AppUser {
    const {id, name, realname} = apiUser;
    const appUser: AppUser = {
        userID: id,
        name: name,
        realname: realname,
    };
    return appUser;
}

const imageStyle = {
    borderRadius: '50%',
    mt: -50,
    display: 'inline-block',
  }

function UserFollow({ params }: { params: { pid: string }}) {
    const [user, setuser] = useState<AppUser>();

    useEffect(() => {
        console.log("djaskl")
        const fetchUserInfo = async () => {
            try {
            const response = await fetch(`/api/userinfo?userid=${params.pid}`, {
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
            console.log(responseData.data)
            setuser(await mapUser(responseData.data));
            } catch (error) {
            console.error('Error fetching following users:', error);
            return null;
            }
        };
        
        fetchUserInfo()
            .catch((error) => {
            console.error('Error:', error);
            });
    },[])

    console.log(user)
    return (
    <div className="flex items-center justify-between border rounded p-[1rem]">
            <div className="flex">
            <Image src="/image.png" style={imageStyle} width={50} height={50} alt="icon"/>
            <div className="ml-[10px] flex justify-between flex-col">
                <p>{user.name}</p>
                {/* <p>{user.realname}</p> */}
            </div>
            </div>
            <button type="button" className="flex justify-end mb-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-5 py-2 me-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Delete
            </button>
        </div>
    )
}
export default UserFollow
