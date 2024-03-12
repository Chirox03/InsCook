import Post from "@/components/Post"
function UserProfile() {
  return (
    <div className="my-2 flex flex-col content-center h-full flex-grow overflow-y-auto">
     <div className="mx-5 mb-5">
        <div className="flex my-2">
        <img className='max-h-28 rounded-full overflow-hidden align-left' src="/image.png" alt="avatar"/>
        <div className="mx-3">
        <h2 className="text-sm font-medium">Username</h2>
        <div className="flex justify-between py-2">
        <button type="button" className="mb-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-5 py-2 me-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
            Edit
        </button>
        <button type="button" className="mb-0 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-5 py-2 me-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Follow</button>
        </div>
        </div>
       </div>
        <h2 className="font-sans text-sm font-medium">Biology</h2>
        <p className="font-sans text-xs">I'm a dreamer.........</p>
        </div>
        <div className="inline-flex rounded-md justify-stretch shadow-sm" role="group">
        <button type="button" className="flex-1 px-4 py-0 font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">   
            <span className="text-xs"> 10</span>
            <br/>
            <span className="text-sm ">Posts</span>
        </button>
        <button type="button" className="flex-1 px-4 py-0 font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
        <span className="text-xs"> 10</span>
            <br/>
            <span className="text-sm ">Followers</span>
        </button>
        <button type="button" className="flex-1 px-4 py-0 font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
        <span className="text-xs"> 10</span>
            <br/>
            <span className="text-sm ">Following</span>
        </button>
        </div>
     <Post/>
     <Post/>
     <Post/>
    </div>
  )
}

export default UserProfile