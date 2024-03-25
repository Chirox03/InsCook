
import Link from 'next/link';
export default function Navbar() {
return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white shadow-md rounded-sm">
    <div className="max-h-14xl max-w-7xl mx-auto px-4 py-2 flex  justify-between items-center">
        <Link href="/">
        <i className="fi fi-rr-home text-2xl"></i>
        </Link>
        <Link href="/">
        <i className="fi fi-br-plus text-2xl"></i>
        </Link>
        <Link href="/">
        <i className="fi fi-rr-heart text-2xl"></i>
        </Link>
        
        <Link href="/">
        <i className="fi fi-rr-user text-2xl"></i>
        </Link>
    </div>
    </nav>
        )};

