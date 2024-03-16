import Post from "@/components/Post";
import Search from "@/app/Search/page";
import Image from "next/image";
function HomePage() {
  return (
    <main className="flex-grow overflow-y-auto pb-20 my-5 text-center max-w-max mx-auto h-full">
          <h1 className="text-lg mb-4 font-sans">InsCook</h1>
        
        {/*search components*/ }
        {/* <Search/> */}
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