import React from 'react'
import StepType from '@/types/StepType';
interface StepProps {
    step: StepType;
    id:number; 
    deleteStep: (index: number) => void;
  }
  const  Step:  React.FC<StepProps> = ({step,id,deleteStep}) =>{
   
  return (
    <div>
        <div>
          <span>Bước {id+1}: </span>
           <div className='flex'>
            <textarea className="my-2 border rounded-md block p-2.5 w-full focus:ring-coral text-sm" placeholder="" value={step.content===""?  `Step ${id+1}` : step.content}></textarea>
            <button onClick={()=> deleteStep(id)}>
              <i className="ml-2 fi py-5 fi-rr-trash text-xl "></i>
            </button>
          </div>
        </div>
           {step.content==='' ? 
          (<button type="button" className="flex items-center justify-stretch px-2 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
          <i className="text-4xl text-slate-300 fi fi-brands-instagram"></i>
          </button>):(
            <img className="rounded-xs max-w-48 max-h-48"src='image.png' alt='step image'/>
          )
           }
    </div>
  )
}
export default Step;
