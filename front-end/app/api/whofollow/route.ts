import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/firebase';
import {  collection, doc , getDocs, updateDoc, where, getDoc, query, addDoc, deleteDoc } from "firebase/firestore";
import UserType from '@/types/UserType';

type ResponseData = {
  message: string,
  data: UserType|null
}

const mapToUserType = (userinfo: any, userid: string): UserType => {
  const user: UserType = {
    id: userid,
    data: {
        avatar: userinfo.avatar,
        biography: "",
        name: userinfo.name,
    }
  };

  return user;
};

export async function GET(req: NextRequest):Promise<NextResponse>{
    const collectionRef = collection(db, 'Followed');
    const UserRef = collection(db, "User");
    const { method } = req;
    
    if (method === 'GET') {
      try {
        const searchParams = req.nextUrl.searchParams
        const userid = searchParams.get('userid');
        console.log(userid);
  
        if (!userid) {
          return NextResponse.json({ message: 'User ID is missing', data: null }, { status: 400 });
        }
  
        // Query document where user_id == userid and post_id == postid
        const querySnapshot = await getDocs(query(collectionRef, where('user_id2', '==', userid)));

        const listdata = querySnapshot.docs.map(doc => doc.data().user_id1);
        
        let out = [];
        for(let i=0; i < listdata.length; i++) {
            out.push(mapToUserType((await getDoc(doc(db, "User", listdata[i]))).data(), listdata[i]));
        }
        
        return NextResponse.json({ message: 'Get following user successfully', data: out },{status: 200});

      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error', data: null },{status:505});
      }
    }
    else {
      return NextResponse.json({ message: 'Method not allowed' , data: null },{status:405});
    }
  }
