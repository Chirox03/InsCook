import PostType from '@/types/PostType';
import { NextRequest, NextResponse } from 'next/server'
import { collection, getDocs,doc ,getDoc,addDoc,updateDoc, getFirestore} from "firebase/firestore";
import {db} from "@/firebase"
import getDownloadUrlForFile from '@/lib/GetFile';
import uploadFile from '@/lib/UploadFile';
import FormData from 'form-data';
// import formidable from 'formidable'; 
type ResponseData = {
  message: string,
  data: PostType|null
}
export async function GET(req: NextRequest) :Promise<NextResponse>{
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
      const postinfo = postSnapshot.data();
      if (postinfo?.is_deleted) {
        return NextResponse.json({ message: 'Post not found' ,data: null},{status:404});
      }

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
    return NextResponse.json({ message: 'Method not allowed' , data: null},{status:405});
  }
}
export async function POST(req: NextRequest):Promise<NextResponse>{

  const { method } = req;
  if (method === 'POST') {
    try {
      const data = await req.formData();
      const ingredients = data.get('ingredients');
      const instructions = data.get('instructions');
      const cover_image = data.get('image') as File;
      if (cover_image instanceof File) {
        const path_in_storage = await uploadFile({ file: cover_image,folderPath:'images/'});
      } else {
        console.error('Image is not a file object');
      }
      const path_in_storage = await uploadFile({file:cover_image,folderPath:'images'})
      /* @ts-ignore */
      const stepsData = [];
      
      for (const [key, value] of data.entries()) {
        if (key.startsWith('steps[')) { // Identify step fields
          /* @ts-ignore */
          const stepId = key.match(/steps\[(\d+)]/)[1]; 
          console.log(stepId)
          const stepProperty = key.split(/[\[\]]/)[3]; // Extract property name (content/image)
          console.log(stepProperty)
          /* @ts-ignore */
          if (!stepsData[stepId]) {
            /* @ts-ignore */
            stepsData[stepId] = {}; // Initialize step object
          }
          /* @ts-ignore */
          stepsData[stepId][stepProperty] = value; // Add content or image data
        }
      }
      let steps = [];
      /* @ts-ignore */
      steps = await Promise.all(stepsData.map(async (step) => {
        if (step.image && step.image instanceof File) {
          const path_in_storage = await uploadFile({ file: step.image ,folderPath: "images/"});
          if (!path_in_storage) {
            throw new Error('Error uploading step image');
          }
          step.image = await getDownloadUrlForFile(path_in_storage);
        }
        return step;
      }));
      // console.log(steps)
      const timestamp = new Date();
      const formattedTimestamp = timestamp.toLocaleString('en-US', {
        month: 'long', // Full month name
        day: 'numeric', // Day of the month
        year: 'numeric', // Full year
        hour: 'numeric', // Hour (12-hour format)
        minute: '2-digit', // Minutes
        second: '2-digit', // Seconds
        hour12: true, // Use 12-hour clock
        timeZoneName: 'short', // Short timezone name (e.g., UTC+7)
        timeZone: 'UTC', // Set timezone to UTC
      });
      const newPostData = {
        'user_id':data.get('user_id'),
        'title': data.get('title'),
        'comment_number':0,
        'like_number':0,
        'category':data.get('category'),
        'caption':data.get('caption'),
        'is_private':false,
        'is_deleted':false,
        /* @ts-ignore */
        'duration':data.get('duration') as number,
        /* @ts-ignore */
        'pax':data.get('pax') as number,
        'timestamp':formattedTimestamp,
        /* @ts-ignore */
        'ingredients':  await JSON.parse(ingredients),
        'step': steps,
        'image':await getDownloadUrlForFile(path_in_storage)
      }

      console.log(newPostData)
      const collectionRef = collection(db, 'Post');
      const newPostRef = await addDoc(collectionRef, newPostData);
      return NextResponse.json( { message: 'Posts created successfully', data: {newPostData,id:newPostRef.id} },{status:200});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: error ,data: null },{status:505});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' , data: null},{status:405});
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const { method } = req;
  if (method === 'PUT') {
    try {
      const data = await req.formData();
      console.log(req)
      const postId = data.get('postId'); // Assuming the post ID is provided in the request
      if (!postId) {
        return NextResponse.json({ message: 'Post ID is required', data: null }, { status: 400 });
      }

      const ingredients = data.get('ingredients');
      const instructions = data.get('instructions');
      const cover_image = data.get('image') as File;

      let path_in_storage= null;
      if (cover_image instanceof File) {
        path_in_storage = await uploadFile({ file: cover_image, folderPath: 'images/' });
      } else {
        console.error('Image is not a file object');
      }
     /* @ts-ignore */
      const stepsData = [];
      for (const [key, value] of data.entries()) {
        if (key.startsWith('steps[')) {
          /* @ts-ignore */
          const stepId = key.match(/steps\[(\d+)]/)[1];
          const stepProperty = key.split(/[\[\]]/)[3];
          /* @ts-ignore */
          if (!stepsData[stepId]) {
          /* @ts-ignore */
            stepsData[stepId] = {};
          }
          /* @ts-ignore */
          stepsData[stepId][stepProperty] = value;
        }
      }

      let steps = [];
      steps = await Promise.all(
        /* @ts-ignore */
        stepsData.map(async (step) => {
          if (step.image && step.image instanceof File) {
            const path_in_storage = await uploadFile({ file: step.image, folderPath: 'images/' });
            if (!path_in_storage) {
              throw new Error('Error uploading step image');
            }
            step.image = await getDownloadUrlForFile(path_in_storage);
          }
          return step;
        })
      );

      const timestamp = new Date();
      const formattedTimestamp = timestamp.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZoneName: 'short',
        timeZone: 'UTC',
      });
      /* @ts-ignore */
      const docRef = doc(db, 'Post', postId);
      await updateDoc(docRef, {
        'title': data.get('title'),
      'category': data.get('category'),
      'caption': data.get('caption'),
      /* @ts-ignore */
      'duration': data.get('duration') as number,
      /* @ts-ignore */
      'pax': data.get('pax') as number,
      /* @ts-ignore */
      'ingredients': await JSON.parse(ingredients),
      'step': steps,
      'image': path_in_storage ? await getDownloadUrlForFile(path_in_storage) : null,
      'timestamp': formattedTimestamp});

      return NextResponse.json({ message: 'Post updated successfully', data: null }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "Internal server error", data: null }, { status: 505 });
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed', data: null }, { status: 405 });
  }
}
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const { method } = req;

  if (method === 'DELETE') {
    try {
      const { postid } = await req.json(); 

      if (!postid) {
        return NextResponse.json({ message: 'Missing post ID', data: null }, { status: 400 }); // Bad request
      }
      const postRef = doc(db, "Post", postid);
      const postSnapshot = await getDoc(postRef);
      let postData = postSnapshot.data();
      /* @ts-ignore */
      postData.is_deleted = true;
      await updateDoc(postRef, postData); // Update the document with new data

      return NextResponse.json({ message: 'Post deleted successfully', data: null }, { status: 200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error', data: null }, { status: 500 });
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed', data: null }, { status: 405 });
  }
}