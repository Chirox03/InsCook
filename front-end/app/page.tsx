
import Navbar from "@/components/NavBar";
import HomePage from "./HomePage";
import UserProfile from "./UserProfile";
import PostDetail from "./PostDetail";

export default function Home() {
  return (
    <div className="relative overflow-hidden h-screen">
      <Navbar />
        {/* Scrollable Main Content */}
        {/* <HomePage/> */}
        {/* <UserProfile/> */}
        <PostDetail/>
        </div>
  )};
