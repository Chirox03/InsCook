import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/firebase';
import {  collection, doc , getDocs, updateDoc, where, getDoc, query, addDoc, deleteDoc } from "firebase/firestore";
import PostType from '@/types/PostType';

type ResponseData = {
  message: string,
  data: PostType|null
}

const mapToPostType = (postinfo: any, postid: string, username: string, useravatar: string, saved: boolean, liked: boolean): PostType => {
  const post: PostType = {
      id: postid, 
      user: {
          userID: postinfo.user_id,
          username: username, 
          avatar: useravatar,
      },
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
    
export async function PUT(req: NextRequest){
  const collectionRef = collection(db, 'Like');
  const collectionUser = collection(db, 'User');
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
      const userinfo = (await getDoc(doc(db, "User", userid))).data();
      const saveSnapshot = await getDocs(query(collectionStorage, where('user_id', '==', userid), where('post_id', '==', postid)));
      const saved = saveSnapshot.empty;

      // Respond with the fetched data 
      let postdata = PostSnapshot.data();
      const isLiked = querySnapshot.docs.map(doc => doc.ref);
      console.log(isLiked);
      console.log(postdata);
      if (querySnapshot.empty) {
        postdata.like_number += 1;
        addDoc(collectionRef, {'post_id': postid, 'user_id': userid});
        updateDoc(documentRef, postdata);
        const output = mapToPostType(postdata, postid, userinfo.name, userinfo.avatar, !saved, true);
        return NextResponse.json( { message: 'Like successfully!', data: output },{ status:200 });
      } else {
        postdata.like_number -= 1;
        deleteDoc(isLiked[0]);
        updateDoc(documentRef, postdata);
        const output = mapToPostType(postdata, postid, userinfo.name, userinfo.avatar, !saved, false);
        return NextResponse.json( { message: 'Removing like successfully!', data: output },{ status:200 });
      }
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Internal server error', data: null },{status:505});
    }
  }
  else {
    return NextResponse.json({ message: 'Method not allowed' , data: null }),{status:405};
  }
}

