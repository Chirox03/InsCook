import PostType from '@/types/PostType';
import { NextRequest, NextResponse } from 'next/server'
import db from '@/firebase'
import { collection, getDocs,doc ,addDoc,updateDoc} from "firebase/firestore";
type ResponseData = {
  message: string,
  data: PostType|null
}
export async function GET(req: NextRequest) {
  const collectionRef = collection(db, 'Post');
  const { method } = req;

  if (method === 'GET') {
    try {

      const querySnapshot = await getDocs(collectionRef)

      if (querySnapshot.empty) {
        return NextResponse.json({ message: 'Post not found' ,data: null},{status:404});
      } else{

        const posts: PostType[] = querySnapshot.docs.map((doc) => doc.data() as PostType); // Convert documents to PostType objectsr type
        return NextResponse.json( { message: 'Posts retrieved successfully', data: posts },{status:200});
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
  const { method } = req;
  
  if (method === 'POST') {
    try {
      const collectionRef = collection(db, 'Post');
      const newPostData = await req.json();
      const newPostRef = await addDoc(collectionRef, newPostData);
      return NextResponse.json( { message: 'Posts created successfully', data: newPostData },{status:200});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error',data: null },{status:505});
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

      return NextResponse.json({ message: 'Post updated successfully', data: postData }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error', data: null }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed', data: null }, { status: 405 });
  }
}