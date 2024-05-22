import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase';
import {  collection, doc , getDocs, updateDoc, where, getDoc, query, addDoc, deleteDoc } from 'firebase/firestore';
import PostType from '@/types/PostType';
import UserType from '@/types/UserType';

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
    
export async function PUT(req: NextRequest):Promise<NextResponse>{
  const collectionRef = collection(db, 'Like');
  // const collectionUser = collection(db, 'User');
  const collectionStorage = collection(db, 'Storage');
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
      const saveSnapshot = await getDocs(query(collectionStorage, where('user_id', '==', userid), where('post_id', '==', postid)));
      const saved = saveSnapshot.empty;

      // Respond with the fetched data 
      let postdata = PostSnapshot.data();

      const userinfo = (await getDoc(doc(db, 'User', postdata?.user_id))).data();
      const isLiked = querySnapshot.docs.map(doc => doc.ref);
      if (querySnapshot.empty) {
        // @ts-ignore
        postdata.likeNumber += 1;
        // @ts-ignore
        postdata.isLiked = true;
        addDoc(collectionRef, {'post_id': postid, 'user_id': userid});
        updateDoc(documentRef, postdata);
        const output = mapToPostType(postdata, postid, userinfo?.name, userinfo?.avatar, !saved, true);
        return NextResponse.json( { message: 'Like successfully!', data: output },{ status:200 });
      } else {
        // @ts-ignore
        postdata.likeNumber -= 1;
        // @ts-ignore
        postdata.isLiked = false;
        deleteDoc(isLiked[0]);
        updateDoc(documentRef, postdata);
        const output = mapToPostType(postdata, postid, userinfo?.name, userinfo?.avatar, !saved, false);
        return NextResponse.json( { message: 'Removing like successfully!', data: output },{ status:200 });
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

const mapToUserType = (userinfo: any, userid: string): UserType => {
  const user: UserType = {
    id: userid,
    data: {
      avatar: userinfo.avatar,
      biography: userinfo.biography,
      name: userinfo.name
    }
  };

  return user;
};
    
export async function GET(req: NextRequest):Promise<NextResponse>{
  const collectionRef = collection(db, 'Like');
  // const collectionUser = collection(db, 'User');
  const { method } = req;
  const searchParams = new URLSearchParams(req.nextUrl.search);
  if (method === 'GET') {
    try {
      
      // const searchParams = req.nextUrl.searchParams;
      const postid = searchParams.get('postid');
      console.log(postid);

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
      const querySnapshot = await getDocs(query(collectionRef, where('post_id', '==', postid)));

      // Respond with the fetched data 
      let listuserid =  querySnapshot.docs.map(doc => doc.data().user_id);
      let out = [];
      for(let i=0; i < listuserid.length; i++) {
        const userinfo = (await getDoc(doc(db, 'User', listuserid[i]))).data();
        out.push(mapToUserType(userinfo, listuserid[i]));
      }

      return NextResponse.json( { message: 'Get liked user successfully!', data: out },{ status:200 });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error', data: null },{status:505});
    }
  }
  else {
    return NextResponse.json({ message: 'Method not allowed' , data: null },{status:405});
  }
}
