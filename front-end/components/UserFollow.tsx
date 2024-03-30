import Image from "next/image"

interface APiUser{
    id:number;
    username: string;
    realname: string;
  
  }
interface AppUser{
userID: number;
username: string;
realname: string;
}
function mapUser(apiUser: APiUser):AppUser {
    const {id, username, realname} = apiUser;
    const appUser: AppUser = {
        userID: id,
        username: username,
        realname: realname,
    };
    return appUser;
}

const imageStyle = {
    borderRadius: '50%',
    mt: -50,
    display: 'inline-block',
  }

function UserFollow() {
    const apiUser: APiUser = {
        id: 1,
        username: "trhuuloc",
        realname: "Trần Hữu Lộc",
      
      }
    const user: AppUser = mapUser(apiUser)
    return (
    <div className="flex items-center justify-between border rounded p-[1rem]">
            <div className="flex">
            <Image src="/image.png" style={imageStyle} width={50} height={50} alt="icon"/>
            <div className="ml-[10px] flex justify-between flex-col">
                <p>{user.username}</p>
                <p>{user.realname}</p>
            </div>
            </div>
            <button type="button" className="flex justify-end mb-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-5 py-2 me-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                Delete
            </button>
        </div>
    )
}
export default UserFollow
