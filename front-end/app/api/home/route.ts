import PostType from '@/types/PostType';
import { NextRequest, NextResponse } from 'next/server';
// import { useRouter } from 'next/router';
import { db } from '@/firebase';
import { collection, getDocs,doc,getDoc ,where,query,limit} from 'firebase/firestore';
// import { CollectionReference, QuerySnapshot, QueryDocumentSnapshot ,DocumentData} from 'firebase/firestore';
// type ResponseData = {
//     message: string,
//     data: PostType|null
//   }
export async function GET(req: NextRequest):Promise<NextResponse> {
  const { method} = req;
  const searchParams = req.nextUrl.searchParams;
  const userID = searchParams.get('userID');
  if (method === 'GET') {
    try {
      // Check if userID is provided
      if (!userID) {
        return NextResponse.json({ message: 'User ID is missing', data: null }, { status: 400 });
      }

      const collectionRef = query(collection(db, 'Post'), limit(10));
      const postSnapshot = await getDocs(collectionRef);
          
      if (postSnapshot.empty) {
        return NextResponse.json({ message: 'Post not found' ,data: null},{status:404});
      } else{
        const postsData: PostType[] = [];
        // console.log()
        for (const postdoc of postSnapshot.docs) {
          const postData = postdoc.data(); 
          console.log(postData);
          if(postData.user_id !=null)
          {

            const docRef = doc(db, 'User', postData.user_id);
            const userDoc = await getDoc(docRef);
            const userData = userDoc.data();
            const post: PostType = {
              id: postdoc.id,
              user: {'userID':userDoc.id,'username':userData?.name,'avatar':userData?.avatar},
              timestamp: postData.timestamp,
              title: postData.title,
              caption: postData.caption,
              image:postData.image,
              likes: postData.like_number,
              comments: postData.comment_number,
              isSaved: false, // Default value
              isLiked: false, // Default value
            };
            const likeQuerySnapshot = await getDocs(query(
              collection(db, 'Like'),where('user_id', '==', userID),where('post_id', '==', post.id)
            ));
            post.isLiked = likeQuerySnapshot.docs.length > 0;
            // Query the Save table to check if the user has saved the post
            const saveQuerySnapshot = await getDocs(query(collection(db, 'Storage'),where('user_id', '==', userID),where('post_id', '==', post.id)));
            post.isSaved = !saveQuerySnapshot.empty;
            postsData.push(post);
            console.log(post);
          }
        }

        return NextResponse.json( { message: 'Posts retrieved successfully', data: postsData },{status:200});
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error',data: null },{status:505});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' , data: null},{status:405});
  }
}