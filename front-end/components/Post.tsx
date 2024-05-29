/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import PostType from '@/types/PostType';
import { useState } from 'react';
import React from 'react';
import BASE_URL from '@/config';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import DateCalculate from './DateCalculate';

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const router = useRouter();
  const { state: auth } = useAuth();
  const [like, setLike] = useState<boolean>(post.isLiked);
  const [save, setSave] = useState<boolean>(post.isSaved);

  const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    router.prefetch(`/UserProfile/${post.user.userID}`);
    router.push(`/UserProfile/${post.user.userID}`);
  };

  const fetchLike = async () => {
    try {
      const response = await axios.get(`/api/like?postid=${post.id}`);
      console.log(response.data)
      setLike(response.data.data.some((user: { id: string | null | undefined; }) => user.id === auth?.id));
    } catch (error) {
      console.log('Error fetching like', error);
    }
  };

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.put(`/api/like`, {
        userid: auth?.id,
        postid: post.id
      });
      setLike(prevLike => !prevLike);
      await fetchLike()
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error('Error liking post');
    }
  };

  const handleLikeView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      router.prefetch(`/Like/${post.id}`);
      router.push(`/Like/${post.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      router.prefetch(`${BASE_URL}/Post/Comment/${post.id}`);
      router.push(`${BASE_URL}/Post/Comment/${post.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSave = async () => {
    try {
      const response = await axios.get(`/api/storage?userid=${auth?.id}`);
      setSave(response.data.data.some((savePost: { id: string; }) => savePost.id === post.id));
    } catch (error) {
      console.log('Error fetching save', error);
    }
  };

  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.put(`/api/storage`, {
        userid: auth?.id,
        postid: post.id
      });
      setSave(prevSave => !prevSave);
      await fetchSave();
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Error saving post');
    }
  };

  return (
    <div className="w-full my-2">
      <div className="mt-6">
        <div className="flex flex-row m-2 ml-1 items-start">
          <img className="w-16 h-16 rounded-full" src={post?.user?.avatar} alt="User Avatar" />
          <div className="ml-2 pt-2 flex font-sans flex-col">
            <div className="text-left font-sans font-semibold text-slate-600 text-md cursor-pointer" onClick={handleUserClick}>{post.user.username}</div>
            <div className="text-left font-normal text-xs text-gray-400">{DateCalculate(post?.timestamp)}</div>
          </div>
        </div>
      </div>
      <div className="h-400 rounded-s">
        <img className="w-full h-80" src={post.image || undefined} alt="food image" />
      </div>
      <div className="mt-2 flex flex-row justify-start cursor-pointer">
        <div className="flex flex-col mr-2">
          <button onClick={handleLike}>
            {
              like ?
                <i className="fi fi-sr-heart text-black-500"></i> :
                <i className="fi fi-rr-heart text-gray-500"></i>
            }
          </button>
        </div>
        <div className="flex flex-col mr-2">
          <button onClick={handleComment}>
            <i className="fi fi-rr-comment text-gray-500"></i>
          </button>
        </div>
        <div className="flex flex-col mr-2">
          <button onClick={handleSave}>
            {
              save ?
                <i className="fi fi-sr-bookmark text-black-500"></i> :
                <i className="fi fi-rr-bookmark text-gray-500"></i>
            }
          </button>
        </div>
      </div>
      <div className="mt-2 flex flex-row justify-start cursor-pointer">
        <button onClick={handleLikeView}>
          <p className="text-xs not-italic -mt-2">{post.likes} lượt thích</p>
        </button>
      </div>
      <p className="text-left font-bold text-lg text-slate-600">{post.title}</p>
      <p className="text-left md-2 font-sans">
        {post.caption}
        <button type="button" className="ml-2 text-xs underline hover:underline-offset-0">
          <Link href={`/Post/${post.id}`}>- See post... -</Link>
        </button>
      </p>
    </div>
  );
};

export default Post;
