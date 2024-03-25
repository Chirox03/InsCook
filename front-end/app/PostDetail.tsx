import ImageCarousel from "@/components/ImageCarousel"
import Image from "next/image"
function PostDetail() {
  return (
    <div className="h-full">
        {/* Back button */}
        <div className="fixed top-0 left-0 right-0 flex  justify-between">
        <button type="button" className="flex items-center justify-stretch px-2 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
        <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
        </svg>
       </button>
       <div className="mx-2 mt-2 flex flex-row justify-start">
        <div>
            <i className="fi fi-rr-heart mr-3"> </i>
            <br/>
            <span className="text-xs">10</span>
        </div>
        <div>
            <i className="fi fi-rr-comment mr-3"></i>
            <br/>
            <span className="text-xs">10</span>
        </div>
        <div>
        <i className="fi fi-rr-bookmark mr-3"></i>
        </div>
        <div>
        <i className="fi fi-rr-menu-dots mr-2 "></i>
        </div>
        </div>
        </div>
        <div className="h-full mt-16 overflow-y-auto">
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
        <h1 className='text-center font-extrabold text-3xl line-clamp-3'>How to cook Chicken Fried</h1>
        <div className="my-2">
          <ImageCarousel/>
        </div>
        <div>
        <h2 ><span className="text-lg font-semibold">Duration:</span> 20 minutes</h2> 
        </div>
        <div>
        <h2 className="text-lg font-semibold">Ingredients:</h2>
        <ul className='list-disc list-inside'>
          <li>Pepper</li>
          <li>Chicken</li>
          <li>Gralic</li>
          <li>Salt</li>
        </ul>
        </div>
        <div>
        <h2 className="text-lg font-semibold">Instruction:</h2>
        <ul className='list-disc list-inside'>
          <li>Thinly slice the potatoes</li>
          <li>In a medim sized</li>
          <li>Meanwhile, in a large bowl whisk together the flour, banking power and all of the 'batter' seasoning and spices. Scoop out 3 tbsp of the marinade and stir into the flour until lots of little lumps form. This will give you those flaky/crunchy parts</li>
          <li>Now this is a certified hood classic,” the rapper wrote in his cookbook. “A favorite munchie was discovered when I had the bright idea of throwing that bologna in a frying pan. Fry that Oscar Meyer up with some cheese and you’re on your way to a bomb meal, Jack!
          </li>
          <li>Now this is a certified hood classic,” the rapper wrote in his cookbook. “A favorite munchie was discovered when I had the bright idea of throwing that bologna in a frying pan. Fry that Oscar Meyer up with some cheese and you’re on your way to a bomb meal, Jack!</li>
        </ul>
        <li>Now this is a certified hood classic,” the rapper wrote in his cookbook. “A favorite munchie was discovered when I had the bright idea of throwing that bologna in a frying pan. Fry that Oscar Meyer up with some cheese and you’re on your way to a bomb meal, Jack!</li>
        <li>Now this is a certified hood classic,” the rapper wrote in his cookbook. “A favorite munchie was discovered when I had the bright idea of throwing that bologna in a frying pan. Fry that Oscar Meyer up with some cheese and you’re on your way to a bomb meal, Jack!</li>
        <li>Now this is a certified hood classic,” the rapper wrote in his cookbook. “A favorite munchie was discovered when I had the bright idea of throwing that bologna in a frying pan. Fry that Oscar Meyer up with some cheese and you’re on your way to a bomb meal, Jack!</li>
        <li>Now this is a certified hood classic,” the rapper wrote in his cookbook. “A favorite munchie was discovered when I had the bright idea of throwing that bologna in a frying pan. Fry that Oscar Meyer up with some cheese and you’re on your way to a bomb meal, Jack!</li>
        <li>Now this is a certified hood classic,” the rapper wrote in his cookbook. “A favorite munchie was discovered when I had the bright idea of throwing that bologna in a frying pan. Fry that Oscar Meyer up with some cheese and you’re on your way to a bomb meal, Jack!</li>
        <li>Now this is a certified hood classic,” the rapper wrote in his cookbook. “A favorite munchie was discovered when I had the bright idea of throwing that bologna in a frying pan. Fry that Oscar Meyer up with some cheese and you’re on your way to a bomb meal, Jack!</li>

        </div>
        </div>
    </div>
  )
}
export default PostDetail
