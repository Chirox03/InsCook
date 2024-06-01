'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Post from '@/components/Post';
import PostType from '@/types/PostType';
import BASE_URL from '@/config';

const mapToPostType = (postinfo: any, postid: string, username: string, useravatar: string, saved: boolean, liked: boolean): PostType => {
  const post: PostType = {
    id: postid,
    user: {
      userID: postinfo.user_id,
      username: username,
      avatar: useravatar,
    },
    image: postinfo.image,
    timestamp: postinfo.timestamp,
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
  const [duration, setDuration] = useState<number | null>(null);
  const [pax, setPax] = useState<number | null>(null);
  const [method, setMethod] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string | null>('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [postDataList, setPostDataList] = useState<PostType[]>([]);

  const handleChangeDuration = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setDuration(value ? Number(value) : null);
  };
  const handleChangePax = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setPax(value ? Number(value) : null);
  };
  const handleChangeMethod = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setMethod(value || null);
  };
  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value || null);
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

  const fetchPost = async (id: string) => {
    console.log(id)
    try {
      const response = await axios.get(`/api/posts?id=${id}`);
      const user = await fetchUserById(response.data.data.user_id);
      return { postData: response.data, user };
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  };

  const fetchUserById = async (id: string) => {
    try {
      const response = await axios.get(`/api/userinfo?userid=${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button = e.currentTarget;
    if (button) {
      button.disabled = true;
    }

    setPostDataList([]);

    const appApi = 'http://127.0.0.1:5000/search';
    setSearchText(searchText === '' ? null : searchText);
    try {
      const response = await axios.post(appApi, {
        method: method,
        duration: duration,
        portion: pax,
        image: image,
        text: searchText,
        ingredients: ingredients,
      });

      if (response.data) {
        for (let i = 0; i < response.data.doc_ids.length; i++) {
          const pId = response.data.doc_ids[i];
          const { postData, user } = await fetchPost(pId);
          const mappedPost = mapToPostType(postData.data, pId, user.data.name, user.data.avatar, false, false);
          setPostDataList((prevList) => [...prevList, mappedPost]);
        }
      } else {
        console.log('No results found');
      }
      if (button) {
        button.disabled = false;
      }
    } catch (error) {
      console.log(error);
      if (button) {
        button.disabled = false;
      }
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
            value={searchText ?? ''}
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
                value={duration ?? ''}
                onChange={handleChangeDuration}
                className="text-xs h-6 rounded-md mr-2 p-1">
                <option value="">Any</option>
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
                value={pax ?? ''}
                onChange={handleChangePax}
                className="text-xs h-6 rounded-md mr-2 p-1">
                <option value="">Any</option>
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
                value={method ?? ''}
                onChange={handleChangeMethod}
                className="text-xs h-6 rounded-md mr-2 p-1">
                <option value="">Any</option>
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
          className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2"
          style={{ flexShrink: 0 }} >
          Search
        </button>
        </div>
      </div>

      <h2 className='text-md font-sans ml-2'>Search results</h2>
      {postDataList.map((postData, index) => (
        <Post key={index} post={postData} />
      ))}
    </div>
  );
}
