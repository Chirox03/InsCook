import Image from "next/image";
import UserType from "@/types/UserType";

interface UserProps {
    user: UserType;
  }

const UserTrending: React.FC<UserProps> = ({ user }) => {
  // console.log(user)
    if (user.data.avatar==null)
      user.data.avatar="/image.png"
    // console.log('Posts',posts)
    return (
      <div className="rounded-full border-2 mx-2 overflow-hidden">
            <Image src={user.data.avatar} width={100} height={100} alt="avatar" />
        </div>
    );
  }
  
export default UserTrending;