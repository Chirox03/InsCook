import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server'
import { collection , doc, setDoc } from "firebase/firestore";
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
      if(email.length<6) {
        return NextResponse.json({ message: 'Mật khẩu phải dài từ 6 ký tự! Vui lòng nhập lại mật khẩu.',data: null },{status:505});
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
      return NextResponse.json( { message: 'Tạo tài khoản thành công!' },{ status:200 });
    } catch (error) {
      console.error(error);      
      return NextResponse.json({ message: 'Email đã được sử dụng! Vui lòng đổi email.' },{status:505});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' }),{status:405};
  }
}