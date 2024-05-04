'use client'
import Image from "next/image"
import {FormProvider, useForm, useFormContext, SubmitHandler} from "react-hook-form"
import Input from "@/components/Input"
import { useState } from "react"

interface FormData {
    username: string;
    password: string;
}

function SignUp () {
    const methods = useForm<FormData>();

    // const onSubmit = methods.handleSubmit(data => {
    //     console.log(data)
    // })

    const { handleSubmit } = methods;

    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit: SubmitHandler<FormData> = async (formData) => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            console.log(response)
            if (!response.ok) {
                const data: { message: string } = await response.json();
                throw new Error(data.message);
            }

            // Registration successful, handle success scenario if needed
            console.log('Registration successful');

        } catch (error) {
            console.error(error);
            setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    };

    return (
        <div className="h-full bg-gradient-to-b font-sans">
        <script src="https://cdn.tailwindcss.com"></script>
        <div className="flex flex-col items-center">
            <div className="mt-20">
                <Image src="/icon.png" width={100} height={100} alt="app-icon"/>
            </div>
            <h1 className="text-center text-grey mt-5 mb-20"> Đăng ký để xem công thức thú vị từ bạn bè</h1>
            <button type="button" className="w-3/4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            <input type="image" src="./google.png" alt="app-icon" className="w-4 h-4 mr-2"/>
            <span className="text-base">Đăng ký bằng Google</span>
            </button>
            <button type="button" className="w-3/4 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            <input type="image" src="./facebook.png" alt="app-icon" className="w-4 h-4 mr-2"/>
                Đăng ký bằng Facebook
            </button>   
            <p className="w-full text-center overflow-hidden before:h-[1px] after:h-[1px] after:bg-gray-200 
           after:inline-block after:relative after:align-middle after:w-1/3 
           before:bg-gray-200 before:inline-block before:relative before:align-middle 
           before:w-1/3 before:right-2 after:left-2 text-sm p-4 text-gray-300">Hoặc
            </p>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Input 
                        label="username"
                        type="text"
                        id="username"
                        placeholder="Tên người dùng, email/số di động"
                        errormessage="Vui lòng nhập tên người dùng"
                    />
                    <Input 
                        label="password"
                        type="password"
                        id="password"
                        placeholder="Mật khẩu"
                        errormessage="Vui lòng nhập mật khẩu"
                       
                    />
                    <button type="submit" className="w-full ml-2.5 mr-2.5 border text-gray border-gray focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Tạo tài khoản
                    </button>
                </form>
            </FormProvider>
        </div>
        </div>
    )
}

export default SignUp