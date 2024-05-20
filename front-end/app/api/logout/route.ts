import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/firebase';
import UserType from '@/types/UserType';

type ResponseData = {
  message: string,
  data: UserType|null
}

export async function POST(req: NextRequest):Promise<NextResponse>{
  const { method } = req;
  
  if (method === 'POST') {
    try {
      // Firebase signout
      console.log(auth.currentUser);
      if (auth.currentUser) {
        auth.signOut();
      }

      // Respond with the fetched data 
      return NextResponse.json( { message: 'User signed out', data: null },{ status:200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error', data: null },{status:505});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed', data: null},{status:405});
  }
}