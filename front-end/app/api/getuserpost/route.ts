import { NextRequest, NextResponse } from 'next/server';
import {  db } from '@/firebase';
import {  query, collection , getDocs, where, getDoc, doc } from 'firebase/firestore';
import PostType from '@/types/PostType';

// type ResponseData = {
//   message: string,
//   data: PostType|null
// }

const mapToPostType = (postinfo: any, postid: string, username: string, useravatar: string, saved: boolean, liked: boolean): PostType => {
  const post: PostType = {
    id: postid, 
    user: {
      userID: postinfo.user_id,
      username: username, 
      avatar: useravatar,
    },
    image: postinfo.image,
    timestamp: new Date(postinfo.datetime), 
    title: postinfo.title,
    caption: postinfo.caption,
    likes: postinfo.like_number,
    comments: postinfo.comment_number,
    isSaved: saved, 
    isLiked: liked, 
  };

  return post;
};

export async function GET(req: NextRequest):Promise<NextResponse>{
  const collectionRef = collection(db, 'Post');
  const collectionLike = collection(db, 'Like');
  const collectionStorage = collection(db, 'Storage');
  //const collectionUser = collection(db, 'User');
  const { method } = req;
  
  if (method === 'GET') {
    try {
      const url = new URL(req.url);
      const userid = url.searchParams.get('userid');
      console.log('userid',userid);

      if (!userid) {
        return NextResponse.json({ message: 'User ID not provided', data: userid }, { status: 400 });
      }
      // Query documents where user_id == userid 
      const querySnapshot = await getDocs(query(collectionRef, where('user_id', '==', userid)));

      // Check if querySnapshot is empty
      if (querySnapshot.empty) {
        return NextResponse.json({ message: 'Post not found', data: null },{ status:404 });
      }

      const userinfo = (await getDoc(doc(db, 'User', userid))).data();
      let output: PostType[] = [];
      const posts = querySnapshot.docs.map(doc => doc);
      console.log(posts[0]);
      for (let i = 0; i < posts.length; i++) {
        const doc = posts[i];
        const likeSnapshot = await getDocs(query(collectionLike, where('user_id', '==', userid), where('post_id', '==', doc.id)));
        const like = likeSnapshot.empty;
        const saveSnapshot = await getDocs(query(collectionStorage, where('user_id', '==', userid), where('post_id', '==', doc.id)));
        const saved = saveSnapshot.empty;
        output.push(mapToPostType(doc.data(), doc.id, userinfo?.name, userinfo?.avatar, !saved, !like));
      }

      return NextResponse.json( { message: 'Posts retrieved successfully', data: output },{status:200});      
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error', data: null },{status:505});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' , data: null },{status:405});
  }
}

