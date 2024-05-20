import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server'
import {  doc, setDoc } from "firebase/firestore";
import { auth, db } from '@/firebase';

type ResponseData = {
  message: string
}

export async function POST(req: NextRequest):Promise<NextResponse>{
  const { method } = req;
  
  if (method === 'POST') {
    try {
      // Firebase authentication
      const {id ,avatar,name} = await req.json();

      // Create user data  
      /* @ts-ignore */
      const newUserData = {
        "avatar": avatar,
        "biography": null,
        "name": name
      }
      console.log(id);
      const documentRef = doc(db, "User", id);
      const newUserRef = await setDoc(documentRef, newUserData);

      // Respond with the fetched data 
      return NextResponse.json( { message: 'Register successfully' },{ status:200 });
    } catch (error) {
      console.error(error);      
      return NextResponse.json({ message: 'Email is used by another account' },{status:409});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' },{status:405});
  }
}