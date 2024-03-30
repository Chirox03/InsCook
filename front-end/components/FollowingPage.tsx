import UserFollowing from "@/components/UserFollowing"
function FollowingPage() {
    return (
        <div className="flex flex-col w-[100%] bg-white">
                <div className="divide-y">
                <UserFollowing/>
                <UserFollowing/>
                <UserFollowing/>
                <UserFollowing/>
                </div>
        </div>
    )
}

export default FollowingPage