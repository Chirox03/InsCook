import { signInWithEmailAndPassword  } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server';
import { auth, db } from '@/firebase';
import { doc , getDoc } from 'firebase/firestore';
import UserType from '@/types/UserType';

// type ResponseData = {
//   message: string,
//   data: UserType|null
// }

export async function POST(req: NextRequest):Promise<NextResponse>{
  const { method } = req;
  
  if (method === 'POST') {
    try {
      // Firebase authentication
      //check if user signed in
      /*
      if (auth.currentUser) {
        return NextResponse.json( { message: 'User logged in' },{ status:200 });
      }
      */
      const { email, password } = await req.json();
      console.log(email, password);
      const user = await signInWithEmailAndPassword(auth, email, password);
      /* @ts-ignore */
      const documentId = user.user.reloadUserInfo.localId;

      // Create a reference to the document with the specified ID in the specified collection
      const documentRef = doc(db, 'User', documentId);

      // Get the document data
      const documentSnapshot = await getDoc(documentRef);

      let userdata = {'id': documentId, 'data': documentSnapshot.data()};
      if (!documentSnapshot.exists()) {
        /* @ts-ignore */
        userdata.data = null;
      }
      console.log(auth.currentUser);

      // Respond with the fetched data 
      return NextResponse.json( { message: 'Login successfully', data: userdata },{ status:200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Wrong email or password', data:null },{status:401});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed', data: null},{status:405});
  }
}


