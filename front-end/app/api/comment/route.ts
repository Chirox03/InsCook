import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase'
import { collection, doc, getDoc, getDocs, updateDoc, query, where, addDoc, deleteDoc } from 'firebase/firestore';
import CommentType from '@/types/CommentType';

type ResponseData = {
    message: string;
    data: CommentType | null;
  };

// Define a function to map Firebase document data to CommentType
  const mapToCommentType = (commentData: any, commentid: String, userinfo: any, userid: String): CommentType => {
    // Implement mapping logic according to your data structure
    const comment: CommentType = {
      id: commentid,
      content: commentData.content,
      timestamp: commentData.datetime,
      user: {
        userID: userid,
        username: userinfo.name,
        avatar: userinfo.avatar,
      },
    };
    return comment;
  };

  export async function PUT(req: NextRequest) { //Add comment
    const { method } = req;
  
    if (method === 'PUT') {
      try {
        // Extract data from request body
        const { content, userid, postid } = await req.json();
  
        // Validate required fields
        if (!content || !userid || !postid) {
          return NextResponse.json({ message: 'Invalid request body', data: null }, { status: 400 });
        }
  
        // Add your logic here for handling comment submission and database interaction
        // For example:
        const commentData = {
          content: content,
          datetime: new Date().toISOString(), // Assuming timestamp is stored as ISO string
          is_private: false,
          user_id: userid,
          post_id: postid,
        };
  
        // Add the comment data to Firestore
        const docRef = await addDoc(collection(db, 'Comment'), commentData);
        const userinfo = (await getDoc(doc(db, "User", userid))).data();

        // Return response with added comment
        return NextResponse.json({ message: 'Comment added successfully', data: mapToCommentType(commentData, docRef.id, userinfo, userid) }, { status: 200 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error', data: null }, { status: 505 });
      }
    } else {
      return NextResponse.json({ message: 'Method not allowed', data: null }, { status: 405 });
    }
  }

  export async function GET(req: NextRequest) { //Get comments of a post
    const collectionRef = collection(db, "Comment");
    const { method } = req;
  
    if (method === 'GET') {
      try {
        const searchParams = req.nextUrl.searchParams;
        const postid = searchParams.get('postid');
        console.log(postid);

        if (postid==null) {
            return NextResponse.json({ message: 'Post ID not provided', data: null }, { status:400 });
        }
        
        const querySnapshot = await getDocs(query(collectionRef, where("post_id", "==", postid)));
        const comments = querySnapshot.docs.map(doc => doc.data());
        const ids = querySnapshot.docs.map(doc => doc.id);

        let out = [];
        for(let i=0; i < ids.length; i++) {
            const userinfo = (await getDoc(doc(db, "User", comments[i].user_id))).data();
            out.push(mapToCommentType(comments[i], ids[i], userinfo, comments[i].user_id));
        }
  
        // Return response with added comment
        return NextResponse.json({ message: 'Get comments successfully', data: out }, { status: 200 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error', data: null }, { status: 505 });
      }
    } else {
      return NextResponse.json({ message: 'Method not allowed', data: null }, { status: 405 });
    }
  }

  
  export async function DELETE(req: NextRequest) { //Remove comment
    const { method } = req;
  
    if (method === 'DELETE') {
      try {
        const { commentid } = await req.json();

        if (!commentid) {
          return NextResponse.json({ message: 'Comment ID not provided', data: null }, { status: 400 });
        }

        const docref = doc(db, "Comment", commentid);

        deleteDoc(docref);
  
        // Return response with added comment
        return NextResponse.json({ message: 'Comment deleted successfully', data: null }, { status: 200 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error', data: null }, { status: 505 });
      }
    } else {
      return NextResponse.json({ message: 'Method not allowed', data: null }, { status: 405 });
    }
  }

