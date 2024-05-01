import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server'
import { collection ,doc , getDoc } from "firebase/firestore";
import UserType from '@/types/UserType';
type ResponseData = {
  message: string,
  data: UserType|null
}
const auth = getAuth()
export async function POST(req: NextRequest){
  const { method } = req;
  
  if (method === 'POST') {
    try {
      // Firebase authentication
      const { email, password } = await req.json();
      console.log(email, password)
      const user = await signInWithEmailAndPassword(auth, email, password);
      const documentId = user.user.reloadUserInfo.localId;

      // Create a reference to the document with the specified ID in the specified collection
      const documentRef = doc(db, "User", documentId);

      // Get the document data
      const documentSnapshot = await getDoc(documentRef);

      let userdata = {"id": documentId, "user": documentSnapshot.data()};
      if (!documentSnapshot.exists()) {
        userdata.user = null;
      }
      console.log(userdata);

      // Respond with the fetched data 
      return NextResponse.json( { message: 'Đăng nhập thành công!', data: userdata },{ status:200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Sai tài khoản hoặc mật khẩu',data: null },{status:505});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' , data: null}),{status:405};
  }
}