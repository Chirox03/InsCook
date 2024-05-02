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
      return NextResponse.json( { message: 'Change password successfully' },{ status:200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Wrong email or password' },{status:401});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' }),{status:405};
  }
}