import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/firebase';
import { collection, addDoc, getDoc,getDocs  } from 'firebase/firestore';
import CommentType from '@/types/CommentType';

type ResponseData = {
    message: string;
    data: CommentType | null;
};

// Define a function to map Firebase document data to CommentType
const mapToCommentType = (commentData: any): CommentType => {
    // Implement mapping logic according to your data structure
    const comment: CommentType = {
      id: commentData.id,
      content: commentData.content,
      timestamp: new Date(commentData.timestamp),
      user: {
        userID: commentData.user.userID,
        username: commentData.user.username,
      },
      reply: commentData.reply || [], // Assuming reply is an array
    };
    return comment;
};
export async function GET(req: NextRequest) {
    const collectionRef = collection(db, 'Comment');
    const { method, body } = req;
  
    if (method === 'GET') {
      try {
        const querySnapshot = await getDocs(collection(db, 'comments'));
            
        // Map fetched comments to CommentType
        const comments = querySnapshot.docs.map(doc => mapToCommentType(doc.data()));

        // Return response with fetched comments
        return NextResponse.json({ message: 'Comments fetched successfully', data: comments }, { status: 200 });
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error',data: null },{status:505});
      }
    } else {
      return NextResponse.json({ message: 'Method not allowed' , data: null}),{status:405};
    }
  }
export async function POST(req: NextRequest) {
    const { method } = req;

    if (method === 'POST') {
        try {
            // Extract data from request body
            const { content, userID, username } = await req.json();

            // Validate required fields
            if (!content || !userID || !username) {
                console.log(content)
                return NextResponse.json({ message: 'Invalid request body', data: null }, { status: 400 } );
            }

            // Add the comment data to Firestore
            const commentData = {
                content,
                timestamp: new Date().toISOString(), // Assuming timestamp is stored as ISO string
                user: {
                    userID,
                    username,
                },
                reply: [], // Assuming initial comment has no replies
            };

            const docRef = await addDoc(collection(db, 'comments'), commentData);

            // Fetch the added comment from Firestore
            const docSnapshot = await getDoc(docRef)
            const comment = mapToCommentType(docSnapshot.data());

            // Return response with added comment
            console.log(content)
            return NextResponse.json({ message: 'Comment added successfully', data: comment }, { status: 201 });
        } catch (error) {
            console.error(error);
            return NextResponse.json({ message: 'Internal server error', data: null }, { status: 500 });
        }
    } else {
        return NextResponse.json({ message: 'Method not allowed', data: null }, { status: 405 });
    }
}
