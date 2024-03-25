import Image from "next/image"

function SignUp () {
    return (
        
        <div className="h-full bg-gradient-to-b from-red-200 to-red-700 font-sans">
        <script src="https://cdn.tailwindcss.com"></script>
        <div className="flex flex-col items-center justify-center">
            <div className="mt-20">
                <Image src="/icon.png" width={100} height={100} alt="app-icon"/>
            </div>
            <h1 className="text-center text-grey mt-5 mb-20"> Đăng ký để xem công thức thú vị từ bạn bè</h1>
            <button type="button" className="w-[420px] ml-[5px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            <input type="image" src="./google.png" alt="app-icon" className="w-4 h-4 mr-2"/>
            <span className="text-base">Đăng ký bằng Google</span>
            </button>
            <button type="button" className="w-[420px] ml-[5px] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            <input type="image" src="./facebook.png" alt="app-icon" className="w-4 h-4 mr-2"/>
                Đăng ký bằng Facebook
            </button>   
            <p className="w-full text-center overflow-hidden before:h-[1px] after:h-[1px] after:bg-gray-200 
           after:inline-block after:relative after:align-middle after:w-1/3 
           before:bg-gray-200 before:inline-block before:relative before:align-middle 
           before:w-1/3 before:right-2 after:left-2 text-sm p-4 text-gray-300">Hoặc
            </p>
            <form>
                <input type="text" placeholder="Tên người dùng, email/số di động" className="w-[420px] ml-[5px] py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"/>
                <input type="password" placeholder="Mật khẩu" className="w-[420px] ml-[5px] py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"/>
                <button type="submit" className="w-[420px] ml-[5px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Tạo tài khoản
                </button>
            </form>
        </div>
        </div>
    )
}

export default SignUp