import ImageCarousel from "@/components/ImageCarousel"
import Image from "next/image"
import { useEffect, useState } from "react";
import RecipeType from "@/types/RecipeType";
interface APiPost{
  id: number;
  tittle: string;
  description:string;
  duration: number;
  pax: number;
  ingredient: Array<string>
  instructions: Array<{
    step: number;
    content: string;
    isDeleted: boolean;
  }>
}
interface Post{
  id: number;
  tittle: string;
  description: string;
  duration: number;
  pax: number;
  ingredient: Array<string>;
  instructions: Array<{
    step: number;
    content: string;
    isDeleted: boolean;
  }>;
}
function mapPost(apiPost: APiPost): Post{
  const {id,tittle,description,duration,pax,ingredient,instructions} = apiPost;
  const post: Post = {
    id: id,
    tittle: tittle,
    description: description,
    duration: duration,
    pax: pax,
    ingredient: ingredient,
    instructions: instructions
  }
  return post;
}
function PostDetail({ params }: { params: { pid: string }}) {
//   const apiPost: APiPost = {
//     id: 1,
//     tittle: "Shrimp Coconut Linguine",
//     description: "Every now and then, I find myself stirring coconut cream into my favorite dishes. Partly out of curiosity for its intriguing flavor profile, but also because I appreciate its quality as a thickener.",
//     duration: 30,
//     pax: 2,
//     ingredient: ["1/2 cup coconut cream", "225 g spaghetti", "1/4 cup chopped parsley", "1/2 cup shredded cheddar cheese", "1 Tbsp olive oil"],
//     instructions: [{
//         step: 1,
//         content: "Boil water in a large pot and cook spaghetti according to package instructions until al dente.",
//         isDeleted: false // Make sure isDeleted is assigned a boolean value
//     },
//     {
//         step: 2,
//         content: "In a separate pan, heat olive oil over medium heat. Add shrimp and cook until pink and opaque, about 3-4 minutes per side.",
//         isDeleted: true
//     },
//     {
//         step: 3,
//         content: "Add coconut cream to the pan with shrimp and simmer for 2-3 minutes until heated through.",
//         isDeleted: false
//     },
//     {
//         step: 4,
//         content: "Drain cooked spaghetti and add it to the pan with the shrimp and coconut cream. Toss until well coated.",
//         isDeleted: false
//     },
//     {
//         step: 5,
//         content: "Remove from heat and sprinkle with chopped parsley and shredded cheddar cheese. Serve hot.",
//         isDeleted: false
//     }]
// };
  const [post,setPost] = useState<RecipeType|null>(null)
  useEffect ( ( )=>{
    const fetchPostbyId = async () =>{
      try{

        const res = await fetch(`api/post?id=${params.pid}`,{
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json', 
          }})
        if(res.ok){
          const data = await res.json();
          setPost(data.data as RecipeType)
        }
        }catch(error){
          console.error('Error fetching posts:', error);
        }


    }
  })
  // const post: Post = mapPost(apiPost)
  return (
    <div className="h-full">
        {/* Back button */}
        <div className="fixed top-0 left-0 right-0 flex  justify-between bg-white shadow-md rounded-sm">
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
        <h1 className='text-center font-extrabold text-3xl line-clamp-3'>{post?.title}</h1>
        <div className="my-2">
          <ImageCarousel/>
        </div>
        <div>
        <h2 ><span className="text-lg font-semibold">Duration:</span> {post?.duration} minutes</h2> 
        </div>
        <div>
        <h2 className="text-lg font-semibold">Ingredients:</h2>
        <ul className='list-disc list-inside'>
        {post?.ingredients.map((ingredient) => (
           <li>{ingredient}</li>
          ))}

          </ul>
        </div>
        <div>
        <h2 className="text-lg font-semibold">Instruction:</h2>
        <ul className='list-disc list-inside'>
        {post?.instructions.map((instruction,index) => (
           <li><span className="font-semibold">Step {index}:</span> {instruction.content}</li>
          ))}

        </ul>
       

        </div>
        </div>
    </div>
  )
}
export default PostDetail
