'use client';
/* eslint-disable @next/next/no-img-element */
import React, { ChangeEvent, useEffect, useState } from 'react';
import { getStorage, ref ,uploadBytes} from 'firebase/storage';
import 'firebase/storage';
import BASE_URL from '@/config';
import {toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { UserProfileProvider,useUserProfile } from '@/context/UserProfileContext';
import axios from 'axios';
import { avatar } from '@material-tailwind/react';
const imageStyle = {
  borderRadius: '50%',
  mt: -50,
  display: 'inline-block',
};
  interface APiUser{
    id:string;
    data:
    {
      name: string;
    biography: string;
    avatar:string;
    }
  }
  interface AppUserProfile{
    userID: string;
    name: string;
    avatar:any;
    description: string;
  }
const mapUser = async (apiUser: APiUser): Promise<AppUserProfile> => {
  const appUser: AppUserProfile = {
    userID: apiUser.id,
    name: apiUser.data.name,
    description: apiUser.data.biography,
    avatar: apiUser.data.avatar, // Save avatar as Blob
  };
  
  return appUser;
};

  
const  EditProfileComponent = ({ params }: { params: { uid: string }}) =>{
  const { state: userProfile, dispatch } = useUserProfile();
  const router = useRouter();
  useEffect( ()=>{
    const fetchProfile = async () =>{
      try{
        const res = await axios.get(`/api/userinfo?userid=${params.uid}`)
        console.log(res.data.data)
        const data = await mapUser(res.data.data)
          dispatch({type:'SET',payload: data } );
          toast('fetch information succesfully');
      }
      catch(error){
        console.log('Error update user information',error);
        toast('Error update user information');
      }
    };
    fetchProfile();
  },[params.uid]);
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if(file)
     dispatch({type:"CHANGE_AVATAR",payload:file})
  };
  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    const newInfo = {
      'userid':params.uid,
      'name': userProfile?.name,
      'biography': userProfile?.description,
      'avatar': userProfile?.avatar
    };
    // console.log(avatar)
    try{
      await axios.put('/api/userinfo',newInfo,{
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure correct content type
        }});
      console.log('Update user information succesfully');
      toast.success('Update user information succesfully');
      router.push(`/UserProfile/${params.uid}`);
    }catch(err){
      console.log('Something went wrong',err);
      toast.error('Error update user information');
    }
  };

  const handleCancel=(e:React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    router.back()
  }
  const handleChangeUsername = (e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault();
    dispatch({type:"CHANGE_USERNAME",payload:e.target.value});
  }
  const handleChangeBio= (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
    e.preventDefault();
    dispatch({type:"CHANGE_BIO",payload:e.target.value});
  }
  return (
      <form>
        <div className="space-y-12 mt-10">
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
                      onChange={(e)=>handleChangeUsername(e)}
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
                    onChange={(e)=>handleChangeBio(e)}
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
                    <img src={userProfile.avatar instanceof Blob ? URL.createObjectURL(userProfile.avatar):userProfile.avatar} style={imageStyle} width={100} height={100} alt="Selected Image" />
                  <label className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <p>Change</p>
                    <input type="file" className='hidden' onChange={handleImageChange}/>
                  </label>
                </div>
              </div>

            
            </div>
          </div>
          </div>
        <div className="mt-6 flex items-center justify-end gap-x-3">
          <button onClick={(e)=>handleCancel(e)}type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
          </button>
          <button
            type='button'
            onClick={(e)=>handleSubmit(e)}
            // type="submit"
            className="rounded-md bg-coral px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
          Save
          </button>
        </div>
      </form>
)}
const EditProfile = ({ params }: { params: { uid: string } }) => (
  <UserProfileProvider>
    <EditProfileComponent params={params} />
  </UserProfileProvider>
);
export default EditProfile;