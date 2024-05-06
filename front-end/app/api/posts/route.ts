import PostType from '@/types/PostType';
import { NextRequest, NextResponse } from 'next/server'
import { collection, getDocs,doc ,getDoc,addDoc,updateDoc, getFirestore} from "firebase/firestore";
import {db} from "@/firebase"
type ResponseData = {
  message: string,
  data: PostType|null
}
export async function GET(req: NextRequest) {
  const { method} = req;
  if (method === 'GET') {
    try {
      
      const searchParams = req.nextUrl.searchParams
      const postId = searchParams.get('id')
      console.log(postId)
      // Check if userID is provided
      if (!postId) {
        return NextResponse.json({ message: 'Post ID is missing', data: null }, { status: 400 });
      }
      const postRef = doc(db, 'Post',postId);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists()) {
        const postData = postSnapshot.data();
        return NextResponse.json( { message: 'Posts retrieved successfully', data: postData },{status:200});
      } else{
        
        return NextResponse.json({ message: 'Post not found' ,data: null},{status:404});
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error',data: null },{status:505});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' , data: null}),{status:405};
  }
}
export async function POST(req: NextRequest){
  console.log(req.body)

  const { method } = req;
  if (method === 'POST') {
    try {
      const collectionRef = collection(db, 'Post');
      const newPostData = await req.json();
      const newPostRef = await addDoc(collectionRef, newPostData);
      return NextResponse.json( { message: 'Posts created successfully', data: {newPostData,id:newPostRef.id} },{status:200});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: error ,data: null },{status:505});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' , data: null}),{status:405};
  }
}
export async function PUT(req: NextRequest): Promise<NextResponse> {
  const { method } = req;

  if (method === 'PUT') {
    try {
      const { id ,postData} = await req.json(); 

      if (!id || !postData) {
        return NextResponse.json({ message: 'Missing post ID or data', data: null }, { status: 400 }); // Bad request
      }

      const postRef = doc(db, 'Post', id); // Create a document reference with the ID
      await updateDoc(postRef, postData); // Update the document with new data

      return NextResponse.json({ message: 'Post updated successfully', data: {id:id } }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error', data: null }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed', data: null }, { status: 405 });
  }
}