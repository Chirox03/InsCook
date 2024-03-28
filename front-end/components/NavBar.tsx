
import Link from 'next/link';
export default function Navbar() {
return (
    <nav className="fixed sm:h-full sm:col-start-1 sm:col-end-2 bottom-0 left-0 sm:w-auto w-full z-50 bg-white shadow-md rounded-sm">
    <div className="sm:mt-20 sm:max-h-14xl sm:max-w-7xl mx-auto px-4 py-2 flex sm:flex-col justify-between sm:gap-3">
        <Link href="/">
        <i className="fi fi-rr-home text-2xl"></i>
        </Link>
        <Link href="/NewPost">
        <i className="fi fi-br-plus text-2xl"></i>
        </Link>
        <Link href="/NewPost">
        <i className="fi fi-rr-heart text-2xl"></i>
        </Link>
        <Link href="/Search">
        <i className="fi fi-bs-search text-2xl"></i>
        </Link>
        <Link href="/UserProfile">
        <i className="fi fi-rr-user text-2xl"></i>
        </Link>
    </div>
    </nav>
        )};

