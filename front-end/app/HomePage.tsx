import Post from "@/components/Post";
import Image from "next/image";
function HomePage() {
  return (
    <main className="flex-grow overflow-y-auto pb-20 my-5 text-center max-w-max mx-auto h-full">
          <h1 className="text-lg mb-4 font-sans">InsCook</h1>
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
          </form>

        {/* Trending InsCooks */}
        <div className="mt-6 mx-6 overflow-y-auto h-auto">
          <div className="text-left font-sans">Trending InsCooks</div>
          <div className="flex justify-center mt-2">
            <div className="rounded-full border-2 overflow-hidden">
              <Image src="/image.png" width={100} height={100} alt="avatar" />
            </div>
            <div className="rounded-full border-2 overflow-hidden ml-4">
              <Image src="/image.png" width={100} height={100} alt="avatar" />
            </div>
            <div className="rounded-full border-2 overflow-hidden ml-4">
              <Image src="/image.png" alt="avatar" width={100} height={100} />
            </div>
            <div className="rounded-full border-2 overflow-hidden ml-4">
              <Image src="/image.png" alt="avatar" width={100} height={100} />
            </div>
          </div>
        </div>

        {/* Individual Recipe Section */}
        <Post/>

      </main>
  )
}

export default HomePage