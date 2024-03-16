
import Navbar from "@/components/NavBar";
import HomePage from "./HomePage";
import UserProfile from "./UserProfile";
import PostDetail from "./PostDetail";

export default function Home() {
  return (
    <div className="relative overflow-hidden h-screen">
        {/* Scrollable Main Content */}
        {/* <HomePage/> */}
        {/* <UserProfile/> */}
        {/* <Navbar /> */}
        <PostDetail/>
        </div>
  )};
