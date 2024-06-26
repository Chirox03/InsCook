'use client';
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Step from '@/components/Step';
import StepType from '@/types/StepType';
import { useEffect } from 'react';
import { RecipesProvider, useRecipes } from '@/context/RecipesContext';
import uploadFile from '@/lib/UploadFile';
import RecipeType from '@/types/RecipeType';
import { notFound, useRouter } from 'next/navigation';
import {toast} from 'react-toastify';
import fetch from 'node-fetch';
import { useAuth } from '@/context/AuthContext';
import { title } from 'process';
import BASE_URL from '@/config';
import axios from 'axios';
// Define the action types
interface APiPost{
  user_id:string;
  title: string;
  comment_number:number;
  like_number:number;
  category:string;
  timestamp:Date;
  is_private:boolean;
  caption:string;
  duration: number;
  image:string;
  pax: number;
  ingredients: Array<string>
  step: Array<StepType>;
}

function mapPost(recipe: RecipeType,id:string): APiPost{
  const post: APiPost = {
    user_id :id,
    title: recipe.title,
    comment_number:0,
    like_number:0,
    category:recipe.category,
    timestamp: new Date(),
    is_private:false,
    caption:recipe.description,
    duration: recipe.duration as number,
    image:recipe.image as string,
    pax: recipe.pax as number,
    ingredients: recipe.ingredients,
    step: recipe.instructions
  };
  return post;
}
export default function NewPost() {
  const router = useRouter();
  const {state: auth} = useAuth();
  // if (auth==null) {router.push('/Login');}
  const {state: recipe, dispatch } = useRecipes();
  useEffect(() => {
    console.log('Recipe state updated:', recipe);
  }, [recipe]); 
  const prepareFormData = async() =>{
    const data = new FormData();
    data.append('user_id',auth?.id as string) ;
    data.append('title', recipe.title);
    data.append('comment_number','0');
    data.append('like_number','0');
    data.append('category',recipe.category);
    data.append('timestamp', new Date().toISOString() );
    data.append('is_private','false');
    data.append('caption',recipe.description);
    /* @ts-ignore */
    data.append('duration', recipe.duration as string);
    if(recipe.image !== null)
    {data.append('image',recipe.image);}
    /* @ts-ignore */
    data.append('pax',recipe.pax as string),
    data.append('ingredients', JSON.stringify(recipe.ingredients)),
    recipe.instructions.forEach((step, index) => {
      // Append content
      console.log(index);
      data.append(`steps[${index}][content]`, step.content);

      // Append image file
      data.append(`steps[${index}][image]`, step.image as File);
    });
    return data;
  };
     
  const handleSave = async() => {
    try {
      const preparedData = await prepareFormData();
   
      const response = await axios.post('/api/posts', preparedData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const responseData = response.data;
      console.log('Upload Post successfully:', responseData);
      toast.success('Upload Post successfully');
      router.push(`/Post/${responseData.data.id}`);
    }catch(error){
      console.log('Error upload new post',error);
      toast.error('Error when save this post');
      throw(error);
    }
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    dispatch({ type: 'TITTLE', payload: e.target.value });
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    dispatch({ type: 'DESCRIPTION', payload: e.target.value });
  };
  const handlePaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const value = parseInt(e.target.value, 10);
    dispatch({ type: 'PAX', payload: value });
  };
  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const value = parseInt(e.target.value, 10);
    dispatch({ type: 'DURATION', payload: value });
  };
  const handleIngredientChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = e.target.value;
    dispatch({ type: 'CHANGE_INGRE', payload: newIngredients });
  };
  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    dispatch({ type: 'CHANGE_METHOD', payload: e.target.value });
  };

  const addIngredientInput = () => {
    dispatch({type: 'ADD_INGRE' ,payload: '' });
  };

  const addStep = () =>{
    dispatch({type: 'ADD_STEP',payload: {content:'',image:null}});
  };
  const deleteIngredient = (index:number) =>{
    dispatch({type: 'DEL_INGRE',payload: index});
  };
  const deleteStep = (index:number) =>{
    dispatch({type: 'DEL_STEP',payload: index});
  };
  const handleUploadCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the selected file
    //e.preventDefault();
    const reader = new FileReader(); 
    if(e.target.files && e.target.files.length > 0){
      const file = e.target.files[0]; 
      reader.onload = () => {
        console.log('change cover image');
        dispatch({type:'CHANGE_COVER',payload: file});
      };
      // Read the selected file as a data URL
      reader.readAsDataURL(file);
    }else{
      dispatch({type:'CHANGE_COVER',payload: null});
    }
  };
  return (

    <div className='pb-20'>
      <div className='fixed p-2 top-0 left-0 right-0 flex flex-row justify-between bg-white shadow-md rounded-sm '>
        <button type="button" className="flex items-center justify-stretch px-2 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
          <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
          </svg>
        </button>
        <span className='p-1 text-gray'>{auth?.data.name}</span>
        <button type="button" className="flex items-center justify-stretch px-2 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700" onClick={handleSave}>
        Save
        </button>
      </div>

      <form className='mt-20'>
        <div className="flex items-center justify-center">
          <label>
            <input name="cover" onChange={(e)=>handleUploadCoverImage(e)} id="dropzone-file" type="file" className="visible bg-coral" />
            { !recipe.image?
              (
                null
              ): (
                <img className="pt-5 pb-6" alt='step image' src={recipe.image instanceof Blob ? URL.createObjectURL(recipe.image):undefined}/>
              )
            }
          </label>

        </div>   
        <div className="my-5 px-1">
          <label className='font-semibold'>Name of recipe</label>
          <textarea name="title" className="my-5  border rounded-md block p-2.5 w-full focus:ring-coral text-lg" placeholder="Your tittle" value={recipe.title} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleTitleChange(e)}></textarea>
          <textarea name="intro"className="my-5 border rounded-md block p-2.5  w-full focus:ring-coral text-sm" placeholder="Introduction" value={recipe.description} onChange={(e) => handleDescriptionChange(e)}></textarea>
          <div className="mr-24 flex flex-row justify-between gap-3 py-2">
            <label className='font-semibold'>Method</label>
            <div className="mr-2">
              <select
                name="filter"
                className="text-sm h-8 rounded-md mr-2 p-1" 
                value={recipe.pax}
                onChange={(e) => handleMethodChange(e)}>
                <option value={'Fry'}>Fry</option>
                <option value={'Stir'}>Stir</option>
                <option value={'Steam'}>Steam</option>
                <option value={'Boil'}>Boil</option>
                <option value={'Grill'}>Grill</option>
                <option value={'Bake'}>Bake</option>
              </select>
            </div>
          </div>
          <div className="mr-24 flex flex-row justify-between gap-3 py-2">
            <label className='font-semibold'>Portion</label>
            <div className="mr-2">
              <select
                name="filter"
                className="text-sm h-8 rounded-md mr-2 p-1" 
                value={recipe.pax}
                onChange={(e) => handlePaxChange(e)}>
                <option value={1}>1 Pax</option>
                <option value={2}>2 Pax</option>
                <option value={3}>3 Pax</option>
                <option value={4}>4 Pax</option>
                <option value={5}>4+ Pax</option>
              </select>
            </div>
          </div>
          <div className='flex mr-24  flex-row justify-between py-2'>
            <label className='font-semibold'>Duration</label>
            <div className="mr-2">
              <select
                name="filter"
                className="text-sm h-8 rounded-md mr-2 p-1"
                value={recipe.duration} 
                onChange={(e) => handleDurationChange(e)}>
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
          <h1 className='font-semibold'>Ingredients</h1>
          <div className=' mx-2 '>
            {
              recipe.ingredients.map((ingredient,index)=>(
                <div className='my-2' key={index}>
                  <input type="text" className='my-2 mr-2 rounded-md focus:ring-coral '
                    value={ingredient}
                    onChange={(e)=> handleIngredientChange(index,e)}></input>
                  <button className='p-1' onClick={()=>deleteIngredient(index)}>
                    <i className="fi fi-rr-trash text-xl"></i>
                  </button>
                </div>))
            }
       
            <button type="button" className='mt-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-coral font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 '
              onClick={addIngredientInput}>
              <span className='mr-2'> Add ingredients </span>
              <i className="place-content-center fi fi-br-plus"></i>
            </button>
          </div>
          <h2 className='font-semibold'>How to</h2>
          <div className='mx-2 my-2'>
            {recipe.instructions.map((step, index) =>
              <Step key={index} step={step} id={index} deleteStep={deleteStep} />
            )}
            <button type="button" 
              className='mt-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-coral font-medium rounded-md text-sm px-5 py-2.5 me-2 mb-2 '
              onClick={addStep}>
              <span className='mr-2'> Add step</span>
              <i className="place-content-center fi fi-br-plus"></i>
            </button>
          </div>
            
        </div>
      </form>
    </div>
  );
}
