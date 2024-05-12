"use client"
import Navbar from "@/components/NavBar";
import HomePage from "./HomePage";
import { useAuth } from "@/context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

export default function Home() {
  const {state: auth, dispatch } = useAuth();
  const router = useRouter()
  console.log(auth)
  if (auth==null) router.push('/Login');
  return (
    <main className="">
        <HomePage/>
        <ToastContainer/>
    </main>

  )};
