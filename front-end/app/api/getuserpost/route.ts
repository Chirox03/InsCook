import { NextRequest, NextResponse } from 'next/server'
import { auth, db } from '@/firebase';
import {  query, collection , getDocs, where } from "firebase/firestore";
import PostType from '@/types/PostType';

type ResponseData = {
  message: string,
  data: PostType|null
}

export async function GET(req: NextRequest){
  const collectionRef = collection(db, 'Post');
  const { method } = req;
  
  if (method === 'GET') {
    try {

      //check if user does not log in
      /*
      if (!auth.currentUser) {
        return NextResponse.json( { message: 'User does not log in' },{ status:200 });
      }
      */
      const url = new URL(req.url);
      const userid = url.searchParams.get('userid');
      console.log(userid);

      if (!userid) {
        return NextResponse.json({ message: 'User ID is not provided', data: null }, { status: 400 });
      }
      // Query documents where user_id == userid 
      const querySnapshot = await getDocs(query(collectionRef, where('user_id', '==', userid)));

      //check if querySnapshot is empty
      if (querySnapshot.empty) {
        return NextResponse.json({ message: 'Post not found', data: null },{ status:404 });
      }

      //check if current user is userid
      /* 
      if (currentuser != userid && currentuser not follow userid) {
        querySnapshot = await getDocs(query(querySnapshot, where('is_private', '==', True)));
      }
      */

      const posts: PostType[] = querySnapshot.docs.map((doc) => doc.data() as PostType); // Convert documents to PostType objectsr type
      return NextResponse.json( { message: 'Posts retrieved successfully', data: posts },{status:200});      
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error', data: null },{status:505});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' , data: null }),{status:405};
  }
}

