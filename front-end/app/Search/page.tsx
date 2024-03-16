function Search() {
  return (
    <div className="fixed top-0 left-0 right-0"> 
          <form className="relative mx-10">
            <div className="absolute inset-y-3 left-2 flex items-center pointer-events-none">
              <i className="fi fi-rr-search mt-1 "></i>
            </div>
            <input
              type="search"
              className="block w-full py-2 pl-10 text-xs text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Find recipes..."
              required
            />
          </form> 
    </div>
  )
}

export default Search