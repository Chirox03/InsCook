import Tiptap from '@/components/TipTap'
import React from 'react'

export default function page() {
  return (
    <div className='pb-20'>
        <div className='fixed p-2 top-0 left-0 right-0 flex flex-row justify-between bg-white shadow-md rounded-sm '>
        <button type="button" className="flex items-center justify-stretch px-2 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
        <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
       </button>
       <span className='p-1 text-gray'>UserName</span>
       <button type="button" className="flex items-center justify-stretch px-2 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
        Save
       </button>
        </div>

      <div className='mt-14'>
       <div className="flex items-center justify-center">
     <label  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
    </label>
   </div>   
    <div className="my-5 px-1">
    <label className='font-semibold'>Tên món ăn</label>
        <textarea className="my-5  border rounded-md block p-2.5 w-full focus:ring-coral text-lg" placeholder="Your tittle"></textarea>
        <textarea className="my-5 border rounded-md block p-2.5  w-full focus:ring-coral text-sm" placeholder="Introduction"></textarea>
        <div className="mr-24 flex flex-row justify-between gap-3 py-2">
        <label className='font-semibold'>Khẩu phần</label>
        <div className="mr-2">
              <select
                name="filter"
                className="text-sm h-8 rounded-md mr-2 p-1" >
                <option value="">1 Người</option>
                <option value="">2 Người</option>
                <option value="">3 người</option>
                <option value="">4 người</option>
                <option value="">4+ người</option>
              </select>
        </div>
        </div>
        <div className='flex mr-24  flex-row justify-between py-2'>
        <label className='font-semibold'>Thời gian nấu</label>
        <div className="mr-2">
              <select
                name="filter"
                className="text-sm h-8 rounded-md mr-2 p-1" >
                <option value="">5p</option>
                <option value="">15p</option>
                <option value="">30p</option>
                <option value="">1h</option>
                <option value="">1h+</option>
              </select>
          </div>
        </div>
        <h1 className='font-semibold'>Nguyên liệu</h1>
        <div className=' mx-2 '>
        <div className='my-2'>
        <input type="text" className='my-2 mr-2 rounded-md focus:ring-coral '></input>
        <button className=' p-1'>
          <i className="fi fi-rr-trash text-xl"></i>
        </button>
        </div>
        <div>
        <input type="text" className='my-2 mr-2 rounded-md focus:ring-coral '></input>
        <button className=' p-1'>
        <i className="fi fi-rr-trash text-xl"></i>
        </button>
        </div>
        <button type="button" className='mt-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-coral font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 '>
          <span className='mr-2'> Add ingredients </span>
          <i className="place-content-center fi fi-br-plus"></i>
          </button>
        </div>
        <h2 className='font-semibold'>Cách làm</h2>
        <div className='mx-2 my-2'>
          <div>
        <div>
          <span>Bước 2:</span>
          <div className='flex'>
          <textarea className="my-2 border rounded-md block p-2.5 w-full focus:ring-coral text-sm" placeholder="Step 1"></textarea>
          <i className="ml-2 fi py-5 fi-rr-trash text-xl "></i>
          </div>
          </div>
          <button type="button" className="flex items-center justify-stretch px-2 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
          <i className="text-4xl text-slate-300 fi fi-brands-instagram"></i>
          </button>
          </div>
          <div>
          <span>Bước 2:</span>
          <div className='flex'>
          <textarea className="my-2 border rounded-md block p-2.5 w-full focus:ring-coral text-sm" placeholder="Step 1"></textarea>
          <i className="ml-2 fi py-5 fi-rr-trash text-xl "></i>
          </div>
          <button type="button" className="flex items-center justify-stretch px-2 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
          <i className="text-4xl text-slate-300 fi fi-brands-instagram"></i>
          </button>
          </div>
          <div>
          <span>Bước 2:</span>
          <div className='flex'>
          <textarea className="my-2 border rounded-md block p-2.5 w-full focus:ring-coral text-sm" placeholder="Step 1"></textarea>
          <i className="ml-2 fi py-5 fi-rr-trash text-xl "></i>
          </div>
          <button type="button" className="flex items-center justify-stretch px-2 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
          <i className="text-4xl text-slate-300 fi fi-brands-instagram"></i>
          </button>
          </div>
          <button type="button" className='mt-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-coral font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 '>
          <span className='mr-2'> Add step </span>
          <i className="place-content-center fi fi-br-plus"></i>
          </button>  
        </div>
        </div>
        </div>
    </div>
  )
}
