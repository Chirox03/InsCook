import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/firebase';
import {  doc , getDoc, updateDoc } from "firebase/firestore";
import UserType from '@/types/UserType';

type ResponseData = {
  message: string,
  data: UserType|null
}
    
export async function PUT(req: NextRequest){
  const { method } = req;
  
  if (method === 'PUT') {
    try {
      const { userid, newimage, newbio, newbirth, newname } = await req.json();

      // Create a reference to the document with the specified ID in the specified collection
      const documentRef = doc(db, "User", userid);

      // Get the document data
      const documentSnapshot = await getDoc(documentRef);

      // Update
      let userdata = documentSnapshot.data();
      userdata.avatar = newimage;
      userdata.biography = newbio;
      userdata.birth = newbirth;
      userdata.name = newname;
      updateDoc(documentRef, userdata);
      

      // Respond with the fetched data 
      return NextResponse.json( { message: 'Update successfully!', data: userdata },{ status:200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error', data: null },{status:505});
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
      return NextResponse.json({ message: 'User ID not provided', data: null }, { status:400 });
    }

      // Create a reference to the document with the specified ID in the specified collection
      const documentRef = doc(db, "User", userid);

      // Get the document data
      const documentSnapshot = await getDoc(documentRef);
      if (!documentSnapshot.data()) {
        return NextResponse.json( { message: 'User not found', data: null },{ status:404 });
      }
      
      // Respond with the fetched data 
      return NextResponse.json( { message: 'Get user information successfully', data: documentSnapshot.data() },{ status:200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error', data: null },{status:505});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' , data: null }),{status:405};
  }
}

