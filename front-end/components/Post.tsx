import Image from "next/image"
import Link from 'next/link'
function Post() {
  const handlePostClick = () =>{
    
  }
  return (
    <div className="w-full">
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
          
          <button type="button" className="text-xs underline hover:underline-offset-0"  >
           
            <Link href="/Post"> - See post... -</Link>
            </button>
          </p>
        </div>
    </div>
  )
}

export default Post