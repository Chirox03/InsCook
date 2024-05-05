"use client"
import Navbar from "@/components/NavBar";
import HomePage from "./HomePage";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
 <AuthProvider>
    <main className="">

        <HomePage/>
        <ToastContainer/>
    </main>
</AuthProvider>

  )};
