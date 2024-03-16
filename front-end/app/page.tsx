
import Navbar from "@/components/NavBar";
import HomePage from "./HomePage";
import UserProfile from "./UserProfile/UserProfile";
import PostDetail from "./Post/PostDetail";
import Search from "@/app/Search/page";

export default function Home() {
  return (
    <div className="relative overflow-hidden h-screen">
        {/* Scrollable Main Content */}
        {/* <HomePage/> */}
        {/* <UserProfile/> */}
        <Search/>
        <Navbar />
        {/* <PostDetail/> */}
        </div>
  )};
