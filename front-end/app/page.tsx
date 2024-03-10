import Image from "next/image";
import Navbar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="relative overflow-hidden h-screen">
      <Navbar />
        {/* Scrollable Main Content */}
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
        <div className="mt-6">
          <div className="flex flex-row m-2 ml-1">
            <div className="rounded-full overflow-hidden align-left ">
              <Image src="/image.png" width={50} height={50} alt="avatar" />
            </div>
            <div className="ml-2 flex font-sans flex-col">
              <div className="flex flex-row flex-auto">
                <div>Thuong Le</div>
                <div className="ml-4">5 minutes</div>
              </div>
              <div className="text-left">Cooking blogger</div>
            </div>
          </div>
          <div className="h-400">
            <img src="/food.png" alt="food image" />
          </div>
          <div className="mt-2 flex flex-row justify-start">
            <i className="fi fi-rr-heart mr-2"></i>
            <i className="fi fi-rr-comment mr-2"></i>
            <i className="fi fi-rr-bookmark"></i>
          </div>
          <p className="text-left my-2 font-sans">
            This is not your mama’s Rotel dip. Elevate your old standby with a few
            tasty additions—taco seasoning, green onions, cilantro, and lime
            juice—for maximum flavor. You can serve it with tortilla chips, and
            it’s amazing with celery sticks, too.
          </p>
        </div>
        <div className="mt-6">
          <div className="flex flex-row m-2 ml-1">
            <div className="rounded-full overflow-hidden align-left ">
              <Image src="/image.png" width={50} height={50} alt="avatar" />
            </div>
            <div className="ml-2 flex font-sans flex-col">
              <div className="flex flex-row flex-auto">
                <div>Thuong Le</div>
                <div className="ml-4">5 minutes</div>
              </div>
              <div className="text-left">Cooking blogger</div>
            </div>
          </div>
          <div className="h-400">
            <img src="/food.png" alt="food image" />
          </div>
          <div className="mt-2 flex flex-row justify-start">
            <i className="fi fi-rr-heart mr-2"></i>
            <i className="fi fi-rr-comment mr-2"></i>
            <i className="fi fi-rr-bookmark"></i>
          </div>
          <p className="text-left my-2 font-sans">
            This is not your mama’s Rotel dip. Elevate your old standby with a few
            tasty additions—taco seasoning, green onions, cilantro, and lime
            juice—for maximum flavor. You can serve it with tortilla chips, and
            it’s amazing with celery sticks, too.
          </p>
        </div>

      </main>
        </div>
  )};
