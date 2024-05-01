import { signInWithEmailAndPassword, updatePassword  } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/firebase';

type ResponseData = {
  message: string
}

export async function POST(req: NextRequest){
  const { method } = req;
  
  if (method === 'POST') {
    try {
      // Firebase authentication
      const { email, password, newPassword } = await req.json();
      console.log(email, password, newPassword)
      const user = await signInWithEmailAndPassword(auth, email, password);
    
      const changepassword = await updatePassword(user.user, newPassword);

      // Respond with the fetched data 
      return NextResponse.json( { message: 'Đổi mật khẩu thành thành công!' },{ status:200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Sai tài khoản hoặc mật khẩu' },{status:505});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' }),{status:405};
  }
}