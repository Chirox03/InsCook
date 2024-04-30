import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/firebase';
import {  doc , getDoc, updateDoc } from "firebase/firestore";

type ResponseData = {
  message: string,
  data: string
}

function isBase64Image(str) {
  if (typeof str !== 'string') {
      return false;
  }
  // A Base64 string typically starts with 'data:image/' for images
  return true;
}

    
export async function PUT(req: NextRequest){
  const { method } = req;
  
  if (method === 'PUT') {
    try {
      const { userid, image } = await req.json();
      if (!isBase64Image(image)) {
        return NextResponse.json({ message: 'Hình ảnh không hợp lệ',data: null },{status:505});
      }

      // Create a reference to the document with the specified ID in the specified collection
      const documentRef = doc(db, "User", userid);

      // Get the document data
      const documentSnapshot = await getDoc(documentRef);

      // Update
      let userdata = documentSnapshot.data();
      userdata.avatar = image;
      updateDoc(documentRef, userdata);
      

      // Respond with the fetched data 
      return NextResponse.json( { message: 'Thay đổi ảnh đại diện thành công!', data: image },{ status:200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Hình ảnh không hợp lệ', data: null },{status:505});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' , data: null }),{status:405};
  }
}

export async function GET(req: NextRequest){
  const { method } = req;

  if (method === 'GET') {
    try {
      const url = new URL(req.url);
      const userid = url.searchParams.get('userid');
      console.log(userid);

    if (!userid) {
      return NextResponse.json({ message: 'User ID not provided', data: null }, { status: 400 });
    }

      // Create a reference to the document with the specified ID in the specified collection
      const documentRef = doc(db, "User", userid);

      // Get the document data
      const documentSnapshot = await getDoc(documentRef);

      let image = documentSnapshot.data();
      console.log(image);
      
      // Respond with the fetched data 
      return NextResponse.json( { message: 'Get avatar successfully', data: image.avatar },{ status:200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error', data: null },{status:505});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' , data: null }),{status:405};
  }
}

