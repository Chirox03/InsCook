'use client';
import React, { useState } from 'react';
import { Select, Option, Input } from '@/components/MaterialTailwind.ts';
import Post from '@/components/Post';
import axios from 'axios';
import BASE_URL from '@/config';
import PostType from '@/types/PostType';



const mapToPostType = (postinfo: any, postid: string, username: string, useravatar: string, saved: boolean, liked: boolean): PostType => {
  const post: PostType = {
    id: postid, 
    user: {
      userID: postinfo.user_id,
      username: username, 
      avatar: useravatar,
    },
    image: postinfo.image,
    timestamp: (postinfo.datetime), 
    title: postinfo.title,
    caption: postinfo.caption,
    likes: postinfo.like_number,
    comments: postinfo.comment_number,
    isSaved: saved, 
    isLiked: liked, 
  };

  return post;
};


export default function Search() {
  const [duration, setDuration] = useState<number>(5);
  const [pax, setPax] = useState<number>(1);
  const [method, setMethod] = useState<string>('Fry');
  const [searchText, setSearchText] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [postDataList, setPostDataList] = useState<PostType[]>([]);

  const handleChangeDuration = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(Number(event.target.value));
  };
  const handleChangePax = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPax(Number(event.target.value));
  };
  const handleChangeMethod = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(event.target.value);
  };
  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  const handleNewIngredientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewIngredient(event.target.value);
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
    }
  };
  const addIngredient = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (newIngredient.trim() !== '') {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient('');
    }
  };
  const deleteIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const fetchPost = async (id:string) => {
    console.log(id)
    try {
      const response = await axios.get(`/api/posts?id=${id}`)
      // console.log(response.data)
      // console.log(response.data)
      const user = await fetchuserbyid(response.data.data.user_id)
      // console.log(response.data)
      return { postData:response.data,user};
      }catch (error) {
        console.error('Error fetching post:', error);
        throw error;

    }
    
  };

  const fetchuserbyid = async (id:string) => {
    // console.log(id)
    try {
      
      const response = await axios.get(`/api/userinfo?userid=${id}`)

      return response.data.data;
    }catch (error) {
      console.error('Error fetching post:', error);
      throw error;
  };
}
  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.disabled = true;

    const apiURL = 'http://inscook.duckdns.org:5000/search';

    // const appapi = 'http://127.0.0.1:5000/search'
    try {
      const response = await axios.post(apiURL, {
        method: method,
        duration: duration,
        portion: pax,
        image: image,
        text: searchText,
        ingredients: ingredients,
        // method: 'Fry',
        // duration: null,
        // portion: 2,
        // image: null,
        // text: null,
        // ingredients: null,
      });
      // console.log(response.data)
      // const posts = [];
      // const postDataArray = [];

      // const postPromises = response.data.doc_ids.map(async (pId: string) => {
      //   // console.log(pId);
      //    // Assuming the first element contains the post ID
      //   const postData = await fetchPost(pId); // Fetch post data based on ID
      //   // posts.push(postData.data);
      //   console.log('Post Data:', postData);
      // });


      for (let i = 0; i < response.data.doc_ids.length; i++) {
        const pId = response.data.doc_ids[i];
        const {postData,user} = await fetchPost(pId); // Fetch post data based on ID
        console.log(postData)
        console.log(user)
        setPostDataList((prevList) => [...prevList, mapToPostType(postData.data, pId, user.data.name, user.data.avatar, false, false)]);
        // console.log(postData)
      }
      // await Promise.all(postPromises);
      // console.log(response.data);
      e.currentTarget.disabled = false;
      // console.log('sdasjdlkasjdlkasjd',posts)
      // return postDataArray;
    } catch (error) {
      console.log(error);
      e.currentTarget.disabled = false;
      return null;
    }
  };

  

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
            value={searchText}
            onChange={handleSearchTextChange}
            required
          />
          <div className="absolute inset-y-1 right-3 flex items-center">
            <label htmlFor="file-input" className="cursor-pointer">
              <i className="fi fi-brands-instagram"></i>
            </label>
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </form>

        <div className="text-xs flex gap-3 flex-wrap flex-row p-2 my-2">
          <div className="mr-2">
            <div>
              <label className='' htmlFor="filter">Duration </label>
              <select
                name="filter"
                value={duration}
                onChange={handleChangeDuration}
                className="text-xs h-6 rounded-md mr-2 p-1">
                <option value={5}>5m</option>
                <option value={10}>10m</option>
                <option value={15}>15m</option>
                <option value={20}>20m</option>
                <option value={25}>25m</option>
                <option value={30}>30m</option>
                <option value={35}>35m</option>
                <option value={40}>40m</option>
                <option value={45}>45m</option>
                <option value={50}>50m</option>
                <option value={55}>55m</option>
                <option value={60}>1h</option>
                <option value={61}>1h+</option>
              </select>
            </div>
          </div>
          <div className="mr-2">
            <div>
              <label className='' htmlFor="filter">Portion </label>
              <select
                name="filter"
                value={pax}
                onChange={handleChangePax}
                className="text-xs h-6 rounded-md mr-2 p-1">
                <option value={1}>1 Pax</option>
                <option value={2}>2 Pax</option>
                <option value={3}>3 Pax</option>
                <option value={4}>4 Pax</option>
                <option value={5}>4+ Pax</option>
              </select>
            </div>
          </div>
          <div className="mr-1 ">
            <div className=''>
              <label htmlFor="filter">Method: </label>
              <select
                name="filter"
                value={method}
                onChange={handleChangeMethod}
                className="text-xs h-6 rounded-md mr-2 p-1">
                <option value='Fry'>Fry</option>
                <option value='Stir'>Stir</option>
                <option value='Steam'>Steam</option>
                <option value='Boil'>Boil</option>
                <option value='Grill'>Grill</option>
                <option value='Bake'>Bake</option>
              </select>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label>Ingredients:</label>
            {ingredients.map((ingredient, index) => (
              <div className='' key={index}>
                <label className='m-2'>{ingredient}</label>
                <button onClick={() => deleteIngredient(index)}>
                  <i className="fi fi-rr-trash text-xl"></i>
                </button>
              </div>
            ))}
            <div className=''>
              <input
                type="text"
                className='max-w-40 max-h-6 rounded-md text-xs px-2 py-1'
                placeholder='Ingredient'
                value={newIngredient}
                onChange={handleNewIngredientChange}
              />
              <button className='w-6 h-6 p-1' onClick={addIngredient}>
                <i className="fi fi-br-plus"></i>
              </button>
            </div>
          </div>
          <br />
          <button
            onClick={handleSearch}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Search
          </button>
        </div>
      </div>

      <h2 className='text-md font-sans ml-2'>Search results</h2>
      {postDataList.map((postData, index) => (
        // console.log(postData);
        <Post key={index} post={postData} />
      ))}
    </div>
  );
}
