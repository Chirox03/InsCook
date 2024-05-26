import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import UserType from '@/types/UserType';

const mapToUserType = (userinfo: any, userid: string): UserType => {
    const user: UserType = {
      id: userid,
      data: {
        avatar: userinfo.avatar,
        biography: userinfo.biography,
        name: userinfo.name
      }
    };
  
    return user;
  };

export async function GET(req: NextRequest):Promise<NextResponse>{
  const collectionRef = collection(db, "User");
  const { method } = req;

  if (method === 'GET') {
    try {
      const k = 5;  
      const q = query(collectionRef, orderBy('likenum', 'desc'), limit(k));
      const querySnapshot = await getDocs(q);


      // Get the document data
      const topuser: UserType[] = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data().likenum);
        topuser.push(mapToUserType(doc?.data(), doc?.id));
      });

      // Respond with the fetched data 
      return NextResponse.json( { message: 'Get top users successfully', data: topuser},{ status:200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error', data: null },{status:505});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' , data: null },{status:405});
  }
}

