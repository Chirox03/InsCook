import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/firebase';

type ResponseData = {
  message: string,
  userID: string
}

export async function POST(req: NextRequest){
  // console.log(app);
  const { method } = req;
  
  if (method === 'POST') {
    try {
      // Firebase authentication
      const { email, password } = await req.json();
      console.log(email, password)
      const user = await signInWithEmailAndPassword(auth, email, password);

      // Respond with the fetched data 
      return NextResponse.json( { message: 'Đăng nhập thành công!',userID: user.user.reloadUserInfo.localId },{ status:200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Sai tài khoản hoặc mật khẩu',data: null },{status:505});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' , data: null}),{status:405};
  }
}