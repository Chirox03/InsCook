/* eslint-disable @next/next/no-img-element */
import React from 'react';
import CommentType from '@/types/CommentType';
import DateCalculate from './DateCalculate';

interface CommentProps {
    comment: CommentType; // Assuming CommentType is the type of your comment object
  }
const Comment: React.FC<CommentProps> = ({ comment }) => {
  // console.log(comment.timestamp)
  return (
    <div className='pt-2 grid grid-cols-12 px-4 divide-y divide-solid'>
      <div className="col-start-1 col-span-full flex items-start mb-4">
        <img className="w-16 h-16 rounded-full mr-4" src="\image.png" alt="User Avatar" />
        <div className="flex-1 pr-4">
          <p className="font-semibold text-slate-800 text-md mb-1">{comment.user.username}
            <span className='ml-2 font-normal text-xs text-gray-400'>{DateCalculate(comment.timestamp)}</span></p>
          <p className="text-sm font-normal text-slate-600">{comment.content}</p>
          <div className="flex mt-1">
            <button className="text-xs text-gray-500">Reply</button>
          </div>
        </div>
      </div>
      {/* reply section */}
      {/* @ts-ignore */}
      {comment.reply && comment.reply.map((reply,index) =>
        <div className="pt-2 col-start-2 col-span-full flex items-start mb-4" key={index}>
          <img className="w-16 h-16 rounded-full mr-4" src="\image.png" alt="User Avatar" />
          <div className="flex-1 pr-4">
            <p className="font-semibold text-slate-800 text-md mb-1">{reply.user.username}
              <span className='ml-2 font-normal text-xs text-gray-400'>{DateCalculate(reply.timestamp)}</span></p>
            <p className="text-sm font-normal text-slate-600">{reply.content}</p>
            <div className="flex mt-1">
              <button className="text-xs text-gray-500">Reply</button>
            </div>
          </div>
        </div>)}
    </div>
  );
};
export default Comment;