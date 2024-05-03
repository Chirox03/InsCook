"use client"
import Navbar from "@/components/NavBar";
import HomePage from "./HomePage";
import Search from "@/app/Search/page";
import UserProfile from "./UserProfile/page";
import TopUser from "./TopUser";
import EditProfile from "../components/EditProfile";
import { RecipesProvider } from "@/context/RecipesContext";
import { AuthProvider } from "@/context/AuthContext";

export default function Home() {
  return (
 <AuthProvider>
    <main className="">

        <HomePage/>
    </main>
</AuthProvider>

  )};
