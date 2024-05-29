import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase';
import {  collection, doc , getDocs, updateDoc, where, getDoc, query, addDoc, deleteDoc } from 'firebase/firestore';
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
    timestamp: postinfo.timestamp, 
    title: postinfo.title,
    caption: postinfo.caption,
    likes: postinfo.like_number,
    comments: postinfo.comment_number,
    isSaved: saved, 
    isLiked: liked, 
  };

  return post;
};
    
export async function PUT(req: NextRequest):Promise<NextResponse>{
  const collectionRef = collection(db, 'Storage');
  // const collectionUser = collection(db, 'User');
  const collectionLike = collection(db, 'Like');
  const { method } = req;
  
  if (method === 'PUT') {
    try {
      const { userid, postid } = await req.json();

      if (!userid) {
        return NextResponse.json({ message: 'User ID is missing', data: null }, { status: 400 });
      }

      if (!postid) {
        return NextResponse.json({ message: 'Post ID is missing', data: null }, { status: 400 });
      }

      // Create a reference to the document with the specified ID in the specified collection
      const documentRef = doc(db, 'Post', postid);

      // Get the post data
      const PostSnapshot = await getDoc(documentRef);

      // Check if PostSnapshot is empty
      if (!PostSnapshot.data()) {
        return NextResponse.json({ message: 'Post not found', data: null }, { status: 404 });
      }

      // Query document where user_id == userid and post_id == postid
      const querySnapshot = await getDocs(query(collectionRef, where('user_id', '==', userid), where('post_id', '==', postid)));
      const likeSnapshot = await getDocs(query(collectionLike, where('user_id', '==', userid), where('post_id', '==', postid)));
      const liked = likeSnapshot.empty;

      // Respond with the fetched data 
      let postdata = PostSnapshot.data();
      /* @ts-ignore */
      const userinfo = (await getDoc(doc(db, 'User', postdata.user_id))).data();
      const isSaved = querySnapshot.docs.map(doc => doc.ref);
      console.log(isSaved);
      if (isSaved.length == 0) {
        /* @ts-ignore */
        addDoc(collectionRef, {'post_id': postid, 'user_id': userid});
        /* @ts-ignore */
        const output = mapToPostType(postdata, postid, userinfo.name, userinfo.avatar, true, !liked);
        return NextResponse.json( { message: 'Stored successfully!', data: output },{ status:200 });
      } else {
        /* @ts-ignore */
        deleteDoc(isSaved[0]);
        /* @ts-ignore */
        const output = mapToPostType(postdata, postid, userinfo.name, userinfo.avatar, false, !liked);
        return NextResponse.json( { message: 'Removing stored post successfully!', data: output },{ status:200 });
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error', data: null },{status:505});
    }
  }
  else {
    return NextResponse.json({ message: 'Method not allowed' , data: null },{status:405});
  }
}

export async function GET(req: NextRequest):Promise<NextResponse>{
  const collectionLike = collection(db, 'Like');
  const collectionRef = collection(db, 'Storage');
  const { method } = req;
  const searchParams = new URLSearchParams(req.nextUrl.search);
  if (method === 'GET') {
    try {
      
      // const searchParams = req.nextUrl.searchParams;
      const userid = searchParams.get('userid');
      console.log(userid);
  
      if (userid==null) {
        return NextResponse.json({ message: 'User ID not provided', data: null }, { status:400 });
      }
  
      // Create a reference to the document with the specified ID in the specified collection
      const documentRef = doc(db, 'User', userid);
  
      // Get the document data
      const documentSnapshot = await getDoc(documentRef);
      if (!documentSnapshot.data()) {
        return NextResponse.json( { message: 'User not found', data: null },{ status:404 });
      }
        
      const querySnapshot = await getDocs(query(collectionRef, where('user_id', '==', userid)));
      const postsids = querySnapshot.docs.map(doc => doc.data().post_id);
      console.log(postsids);

      let out = [];
      for (let i = 0; i < postsids.length; i++) {
        const element = postsids[i];
        console.log(element);
        const postinfo = (await getDoc(doc(db, 'Post', element))).data();
        if(postinfo)
          {
        /* @ts-ignore */
        const userinfo = (await getDoc(doc(db, 'User', postinfo.user_id))).data();
        /* @ts-ignore */
  
        const liked = (await getDocs(query(collectionLike, where('user_id', '==', postinfo.user_id), where('post_id', '==', element)))).empty;
        /* @ts-ignore */
        if(postinfo && userinfo)
          out.push(mapToPostType(postinfo, element, userinfo.name, userinfo.avatar, true, !liked));
        // console.log(postinfo.timestamp)
}
      }

      // Respond with the fetched data 
      return NextResponse.json( { message: 'Get storage posts successfully', data: out },{ status:200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error', data: null },{status:505});
    }
  } else {
    return NextResponse.json({ message: 'Method not allowed' , data: null },{status:405});
  }
}

