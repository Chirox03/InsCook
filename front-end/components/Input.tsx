import { useFormContext } from "react-hook-form"

interface InputProps {
    label: string;
    type:string;
    id:string;
    placeholder:string;
    errormessage?:string;
}

const Input:React.FC<InputProps> = ({ label, type, id, placeholder,errormessage }) => {
    const { register, formState: { errors }} = useFormContext()
    
    return (
      <div className="flex flex-col">
        <input
          id={id}
          type={type}
          className="w-full ml-2.5 mr-2.5 py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          placeholder={placeholder}
          {...register(label, {
            required: {
              value: true,
              message: 'required'
            },
          })}
        />
        {errors[label] && <span className="w-full text-xs font-medium text-red-500 ml-5">{errormessage}</span>} 
      </div>
    )
  }
export default Input