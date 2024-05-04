  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { NextRequest, NextResponse } from 'next/server'
  import {  doc, setDoc } from "firebase/firestore";
  import { auth, db } from '@/firebase';

  type ResponseData = {
    message: string

  }

  export async function POST(req: NextRequest){
    const { method } = req;
    if (method === 'POST') {
      try {
        // Firebase authentication
        const { email, password } = await req.json();
        console.log(email, password)

        if(password.length<6) {
          return NextResponse.json({ message: 'Password must be at least 6 characters',data: null },{status:400});
        }
        
        // Create account
         const user = await createUserWithEmailAndPassword(auth, email, password);

        // Create user data  
        const UserID = user.user.reloadUserInfo.localId;
        const newUserData = {
          "avatar": null,
          "biography": null,
          "birth": null,
          "name": null
        }
        console.log(UserID);
        const documentRef = doc(db, "User", UserID);
        const newUserRef = await setDoc(documentRef, newUserData);

        // Respond with the fetched data 
        return NextResponse.json( { message: 'Register successfully' },{ status:200 });
      } catch (error) {
        console.log("đâsdasdasd")
        // console.error(error);      
        return NextResponse.json({ message: 'Email is used by another account' },{status:409});
      }
    } else {
      return NextResponse.json({ message: 'Method not allowed' }),{status:405};
    }
  }