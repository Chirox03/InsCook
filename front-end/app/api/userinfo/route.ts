'use server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/firebase';
import {  doc , getDoc, updateDoc } from "firebase/firestore";
import UserType from '@/types/UserType';
import {BASE_URL} from '@config'
import uploadFile from '@/lib/UploadFile';
import getDownloadUrlForFile from '@/lib/GetFile';

type ResponseData = {
  message: string,
  data: UserType|null
}
    
export async function PUT(req: NextRequest){
  const { method } = req;
  if (method === 'PUT') {
    try {
      const data = await req.formData();
      const userid = data.get('userid');
      const name = data.get('name');
      const biography = data.get('biography');
      const file = data.get('avatar') as File;
      if (file instanceof File) {
        // Image is a File object, proceed with upload
        const path_in_storage = await uploadFile({ file: file,folderPath:'images/'});
        // ...
      } else {
        // Image is not a file, handle non-file data or error
        console.error('Image is not a file object');
      }
      console.log(userid)

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

      // Update
      const path_in_storage = await uploadFile({file:file,folderPath:'images'});
      let userdata = documentSnapshot.data();
      userdata.avatar = await getDownloadUrlForFile(path_in_storage);
      userdata.biography = biography;
      userdata.name = name;
      updateDoc(documentRef, userdata);

      // Respond with the fetched data 
      return NextResponse.json( { message: 'Update successfully!', data: {"id": userid, userdata} },{ status:200 });
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
      const searchParams = req.nextUrl.searchParams
      const userid = searchParams.get('userid');
      console.log(userid);

    if (userid==null) {
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

