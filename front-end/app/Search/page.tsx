"use client"
import React, { useState } from 'react'; // Import useState from react
import { Select, Option, Input } from "@/components/MaterialTailwind.ts";
import Post from '@/components/Post';

export default function Search() {
  const [duration,setDuration] = useState<number>(5); // Use useState directly
  const [pax,setPax] = useState<number>(1);
  const [method,setMethod] = useState<string>('Fry')
  const handleChangeDuration = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(event.target.value);
  }
  const handleChangePax = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    setPax(event.target.value);
  }
  const handleChangeMethod= (event: React.ChangeEvent<HTMLSelectElement>) =>{
    setMethod(event.target.value);
  }
  const [ingredients,setIngredients] = useState<string[]>([])
  const [newIngredient,setNewIngredient] = useState<string>('');
  const handleNewIngredientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewIngredient(event.target.value);
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
              <label className='' htmlFor="filter">Duration </label>
              <select
                name="filter"
                value={duration}
                onChange={handleChangeDuration}
                className="text-xs h-6 rounded-md mr-2 p-1" >
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
                className="text-xs h-6 rounded-md mr-2 p-1" >
                <option value={1}>1 Pax</option>
                <option value={2}>2 Pax</option>
                <option value={3}>3 Pax</option>
                <option value={4}>4 Pax</option>
                <option value={5}>4+ Pax</option>
              </select>
            </div>
          </div>
          <div className=" mr-1 ">
            <div className=''>
              <label htmlFor="filter">Method: </label>
              <select
                name="filter"
                value={method}
                onChange={handleChangeMethod}
                className="text-xs h-6 rounded-md mr-2 p-1" 
                >
                <option value={'Fry'}>Fry</option>
                <option value={'Stir'}>Stir</option>
                <option value={'Steam'}>Steam</option>
                <option value={'Boil'}>Boil</option>
                <option value={'Grill'}>Grill</option>
                <option value={'Bake'}>Bake</option>
              </select>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <label>Ingredients:</label>
            {
              ingredients.map((ingredient,index)=>(
                <div className='' key={index}>
                <label className='m-2'>{ingredient}</label>
                <button onClick={()=>deleteIngredient(index)}>
                  <i className="fi fi-rr-trash text-xl"></i>
                </button>
               </div>))
            }
          <div className=''>
          <input type="text" className='max-w-40 max-h-6 rounded-md text-xs px-2 py-1 ' placeholder='Ingredient' value={newIngredient} onChange={(e)=>setNewIngredient(e.currentTarget.value)}></input>
          <button className=' w-6 h-6 p-1' onClick={addIngredient}>
          <i className="fi fi-br-plus"></i>
          </button>
          </div>
          </div>
        </div>
        </div>
        <h2 className='text-md font-sans ml-2'>Search results</h2>
       </div>

  );
}


