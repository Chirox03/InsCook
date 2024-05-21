import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
export default function Navbar() {
    const {state: auth, dispatch } = useAuth();
return (
    <nav className="fixed sm:h-full sm:col-start-1 sm:col-end-2 bottom-0 left-0 sm:w-auto w-full z-50 bg-white shadow-md rounded-sm">
    <div className="sm:mt-20 sm:max-h-14xl sm:max-w-7xl mx-auto px-4 py-2 flex sm:flex-col justify-between sm:gap-3">
        <Link href="/">
        <i className="fi fi-br-home text-2xl"></i>
        </Link>
        <Link href="/NewPost">
        <i className="fi fi-br-plus text-2xl"></i>
        </Link>
        {/* <Link href="/NewPost">
        <i className="fi fi-br-heart text-2xl"></i>
        </Link> */}
        <Link href="/Search">
        <i className="fi fi-bs-search text-2xl"></i>
        </Link>
        <Link href={`/UserProfile/${auth?.id}`}>
        <i className="fi fi-br-user text-2xl"></i>
        </Link>
    </div>
    <div className="flex justify-between px-4 py-2 ">
    <button className='hidden md:block md-10' onClick={()=>{dispatch({type:"LOG_OUT",payload:null})}}>
    <i className="fi fi-br-enter text-2xl"></i>
    </button>
    <style jsx>{`
                @media (max-width: 767px) {
                    .px-4 {
                        display: none;
                    }
                }
            `}</style>
    </div>
   
    </nav>
        )};

