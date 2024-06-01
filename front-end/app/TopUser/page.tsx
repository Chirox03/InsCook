'use client'
import Image from 'next/image';
import UserType from '@/types/UserType';
import { useEffect ,useState} from 'react';
import { useAuth } from '@/context/AuthContext';
import {useRouter} from 'next/navigation';
import axios from 'axios';
const imageStyle = {
  borderRadius: '50%',
  mt: -50,
  display: 'inline-block',
};
export default function TopUser() {
  const [UserList,setUserList] = useState<UserType[]>([]);
  const {state: auth, dispatch } = useAuth();
  const router = useRouter();
  useEffect( ()=>{
    const fetchUser = async () => {
      // console.log(id)
      try {
        
        const response = await axios.get(`/api/topuser`)
        setUserList(response.data.data)
        // return response.data.data;
      }catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    };
  }
    if(auth==null) {
      router.push('/Login');}
    fetchUser()
  },[auth,router]);
  const handleClick = (id:string) =>{
    router.prefetch(`/UserProfile/${id}`);
    router.push(`/UserProfile/${id}`);
  }
  return (
    <div className="flex flex-col justify-center">
      <p className="pt-[5%] text-center text-xl font-bold">Leaderboard</p>
      <div className="mt-[5%]">
        {Array.isArray(UserList) && UserList.map((user, index) => (
          <div key={user.id} className="w-[90%] h-[70px] mt-[2%] ml-[5%] border border-gray-300 rounded-xl border-1">
            <span className="inline-block w-[30px] h-[30px] font-bold mt-[15px] ml-[10px] text-2xl">{index + 1}</span>
            <Image src={user.data.avatar || "/default-avatar.png"} style={imageStyle} width={60} height={60} alt={`User ${index + 1}`} />
            <span className="inline-block text-xl font-bold mt-[15px] ml-[15px]" onClick={()=>handleClick(user.id)}>{user.data.name || `User ${index + 1}`} </span>
            {/* <div className="mt-[-60px] ml-[17em]">
              <Image src={user.data.avatar || "/default-avatar.png"} width={60} height={60} style={{ borderRadius: '30%' }} alt={`User ${index + 1}`} />
            </div> */}
          </div>
        ))}
        {/* <button type="button" className="ml-[25%] w-1/2 text-white bg-gray-800 mt-[10px] hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">View More</button> */}
      </div>
    </div>
  );
}   