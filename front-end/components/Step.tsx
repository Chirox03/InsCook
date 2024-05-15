import React from 'react'
import StepType from '@/types/StepType';
import {  useRecipes } from '@/context/RecipesContext';
interface StepProps {
    step: StepType;
    id:number; 
    deleteStep: (index: number) => void;
  }
  const  Step:  React.FC<StepProps> = ({step,id,deleteStep}) =>{
  const {state: recipe, dispatch } = useRecipes();
  const handelStepChange = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
    const updatedStep :StepType = {content: e.target.value,image:null};
    dispatch({ type: 'CHANGE_STEP', payload: {id , content:updatedStep} });
  } 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    if(e.target.files && e.target.files.length > 0){
      const file = e.target.files[0]; 
      reader.onload = () => {
      const updatedStep: StepType = { ...step, image: file };
      dispatch({ type: 'CHANGE_STEP', payload: { id, content: updatedStep } });
      }
      reader.readAsDataURL(file);
    }else{
      const updatedStep: StepType = { ...step, image: null };
      dispatch({ type: 'CHANGE_STEP', payload: { id, content: updatedStep } });
    }
  };
  return (
    <div>
        <div>
          <span>Step {id+1}: </span>
           <div className='flex'>
            <textarea className="my-2 border rounded-md block p-2.5 w-full focus:ring-coral text-sm"  value={step.content} onChange={(e)=>handelStepChange(e)}></textarea>
            <button onClick={()=> deleteStep(id)}>
              <i className="ml-2 fi py-5 fi-rr-trash text-xl "></i>
            </button>
          </div>
        </div>
        <label>
         <input type="file" accept="image/*" onChange={(e) =>handleImageChange(e)} style={{ display: 'none' }} />
          {/* <button type="button" className="flex items-center justify-stretch px-2 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700"> */}
          <i className="text-4xl text-slate-300 fi fi-brands-instagram"></i>
          {/* </button> */}
        </label>
        {
            step.image ?(
              <img className="rounded-xs max-w-48 max-h-48" src={step.image instanceof Blob?URL.createObjectURL(step.image): step.image} alt='step image'/>
            ):(null)
        }
    </div>
  )
}
export default Step;
