import Image from "next/image"
function Login(){
    return ( 
        <div className="h-full flex flex-col items-center gap-5 justify-center font-sans">
            <div className="">
            <Image src="/icon.png" width={100} height={100} alt="app-icon"/>
            </div>
            <form className="mt-10">
                <input type="text" placeholder="Tên người dùng, email/số di động" className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"/>
                <input type="password" placeholder="Mật khẩu" className="w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"/>
                <button type="submit" className="w-full text-gray border border-gray hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Đăng nhập</button>
            </form>
            <button type="button" className="py-2">Bạn quên mật khẩu ư?</button>
            <button type="button" className="fixed bottom-10 w-full text-blue-500 bg-white hover:bg-slate-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Tạo tài khoản mới</button>
            <h1 className="fixed text-center bottom-5 font-bold">InsCook</h1>
        </div>
    )
}

export default Login