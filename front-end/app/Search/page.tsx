"use client"
import React, { useState } from 'react'; // Import useState from react
import { Select, Option, Input } from "@/components/MaterialTailwind.ts";
import Post from '@/components/Post';

export default function Search() {
  const [filter, setFilter] = useState<string>(''); // Use useState directly

  const handleChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  }

  return (
    <div className='mt-5'>
      <div className="">
        <form className="relative mx-10">
          <div className="absolute inset-y-3 left-2 flex items-center pointer-events-none">
            <i className="fi fi-rr-search mt-1 "></i>
          </div>
          <input
            type="search"
            className="block w-full py-2 pl-10 text-xs text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Find recipes..."
            required
            />
          <div className="absolute inset-y-1 right-3 flex items-center pointer-events-none">
            <i className="fi fi-brands-instagram"></i>
          </div>
        </form>
        <div className="text-xs flex gap-3 flex-wrap flex-row p-2 my-2">
          <div className="mr-2">
            <div>
              <label className='' htmlFor="filter">Thời gian nấu: </label>
              <select
                name="filter"
                value={filter}
                onChange={handleChangeFilter}
                className="text-xs h-6 rounded-md mr-2 p-1" >
                <option value="">5p</option>
                <option value="">15p</option>
                <option value="">30p</option>
                <option value="">1h</option>
                <option value="">1h+</option>
              </select>
            </div>
          </div>
          <div className=" mr-1 ">
            <div className=''>
              <label htmlFor="filter">Phương pháp: </label>
              <select
                name="filter"
                value={filter}
                onChange={handleChangeFilter}
                className="text-xs h-6 rounded-md mr-2 p-1" 
                
                >
                <option className='' value="">Nấu</option>
                <option value="">Hấp</option>
                <option value="">Xào</option>
                <option value="">Chiên</option>
                <option value="">Nướng</option>
                <option value="">Hầm</option>
                <option value="">Luộc</option>
              </select>
            </div>
          </div>
          <div className=''>
          <input type="search" className='max-w-40 max-h-6 rounded-md text-xs px-2 py-1 ' placeholder='Nguyên liệu'></input>
          <button className=' w-6 h-6 '>
          <i className="fi fi-rr-plus"></i>
          </button>
          </div>
        </div>
        </div>
        <h2 className='text-md font-sans ml-2'>Search results</h2>
        <Post/>
       </div>

  );
}


