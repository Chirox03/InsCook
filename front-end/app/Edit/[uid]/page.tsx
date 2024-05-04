'use client'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { getStorage, ref ,uploadBytes} from "firebase/storage";
import firebase from 'firebase/app';
import 'firebase/storage';
import BASE_URL from '@/config';
import { notFound } from 'next/navigation';
import {toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
const imageStyle = {
    borderRadius: '50%',
    mt: -50,
    display: 'inline-block',
  }
  interface APiUser{
    id:number;
    name: string;
    biography: string;
    avatar:string;
    numpost: number;
    numfollowers: number;
    numfollowing: number;
  
  }
  interface AppUserProfile{
    userID: number;
    name: string;
    avatar:Blob|null;
    description: string;
    numpost: number;
    numfollowers: number;
    numfollowing: number;
  }
  const mapUser = async (apiUser: APiUser): Promise<AppUserProfile> => {
    const { id, name, biography, avatar, numpost, numfollowers, numfollowing } = apiUser;
    // const avatarRef = ref(storage, avatar);
    // const avatarURL = await getDownloadURL(avatarRef);
    // const response = await fetch(avatarURL);
    // const avatarBlob = await response.blob();
    const appUser: AppUserProfile = {
        userID: id,
        name: name,
        description: biography,
        avatar: null, // Save avatar as Blob
        numpost: numpost,
        numfollowers: numfollowers,
        numfollowing: numfollowing,
    };
  
    return appUser;
  }
type Action = {type:"CHANGE_USERNAME";payload:string}
| {type:"CHANGE_BIO";payload:string}
| {type:"CHANGE_AVATAR";payload:Blob}
  const userProfileReducer = (state:AppUserProfile, action:Action) => {
    switch (action.type) {
      case "CHANGE_USERNAME":
        return {
          ...state,
          name :action.payload,
        };
      case "CHANGE_BIO":
        return {
          ...state,
          description: action.payload,
        };
      case "CHANGE_AVATAR":
        return{
          ...state,
          avatar: action.payload
        };
      default:
        return state;
    }
  };
  
export default function EditProfile({ params }: { params: { uid: string }}) {
  const [userProfile,setUserProfile] = useState<null|AppUserProfile>(null)
  const router = useRouter()
  useEffect( ()=>{
    const fetchProfile = async () =>{
      try{
        const res = await fetch(BASE_URL+`/api/userinfo?userid=${params.uid}`,
        {method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
        }})
        const data = await res.json();
       if(res.ok){
          setUserProfile(await mapUser(data.data) )
          toast("Change information succesfully")
        }
        
      }
      catch(error){
        console.log("Error update user information",error);
        toast("Error update user information")
      }
    };
    fetchProfile()
   },[])
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
 
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if(file)
    setSelectedImage(file);
  };
  const handleUploadImage = async() =>{
    if(selectedImage){

      const storage = getStorage();
      const avatarRef = ref(storage, 'avatar/'+ selectedImage?.name)
      try {
        const res = await uploadBytes(avatarRef, selectedImage)
        console.log('Image uploaded successfully');
        return res
        
      } catch (error) {
        console.error('Error uploading image:', error);
      toast.success("Error update user information")
    }
     }
  }
  const handleSubmit = async() =>{
    const newInfo = {
      'userid':params.uid,
      'name': userProfile?.name,
      'biography': userProfile?.description,
      'avatar': await handleUploadImage()||userProfile?.avatar
    }
      try{
        const res =await fetch(BASE_URL+'/api/userinfo',{method: 'PUT',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(newInfo)
        
      }) 
      if(res.ok){
        console.log("Update user information succesfully")
        toast.success("Update user information succesfully")
        router.push(`/UserProfile/${params.uid}`)

      }else console.log("Fail to save information",res.status,res.json().message)
    }catch(err){
      console.log("Something went wrong",err)
      toast.error("Error update user information")
    }
    };

  
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h1 className="text-base font-semibold leading-7 text-gray-900">Edit Profile</h1>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={userProfile?.name}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={userProfile?.description}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
              {selectedImage ? (
                <img src={URL.createObjectURL(selectedImage)} style={imageStyle} width={100} height={100} alt="Selected Image" />
                 ) : (
                <img src="/image.png" style={imageStyle} width={100} height={100} alt="Icon" />
                  )}
                <label className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <p>Change</p>
                    <input type="file" className='hidden' onChange={handleImageChange}/>
                </label>
              </div>
            </div>

            
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="full-name" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="full-name"
                  id="full-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div> 
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-3">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
        type='button'
         onClick={handleSubmit}
          // type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
