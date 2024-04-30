import PostType from '@/types/PostType';
import { NextRequest, NextResponse } from 'next/server'
import db from '@/firebase'
import { collection, getDocs,doc ,addDoc,updateDoc} from "firebase/firestore";
type ResponseData = {
  message: string,
  data: PostType|null
}
export async function GET(req:NextRequest) {
    const { pid } = req.query
     res.end(`Post: ${pid}`)
}