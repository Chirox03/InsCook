import React, { useEffect } from 'react';

interface DropdownSearchProps {}

const DropdownSearch: React.FC<DropdownSearchProps> = () => {
  useEffect(() => {
    const dropdownMenu = document.getElementById('dropdown-menu') as HTMLElement;
    const searchInput = document.getElementById('search-input') as HTMLInputElement;

    // Function to toggle the dropdown state
    function toggleDropdown(show: boolean) {
      dropdownMenu?.classList.toggle('hidden', !show);
    }

    // Initially hide the dropdown
    toggleDropdown(false);

    // Add event listener to toggle dropdown when input is focused
    searchInput?.addEventListener('focus', () => {
      toggleDropdown(true); // Show dropdown when input is focused
    });

    // Add event listener to hide dropdown when input loses focus
    searchInput?.addEventListener('blur', () => {
      toggleDropdown(false); // Hide dropdown when input loses focus
    });

    // Add event listener to filter items based on input
    searchInput?.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase();
      const items = dropdownMenu?.querySelectorAll('div');

      items?.forEach((item) => {
        const text = item.textContent?.toLowerCase() ?? '';
        if (text.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });

    return () => {
      searchInput?.removeEventListener('input', () => {});
      searchInput?.removeEventListener('focus', () => {});
      searchInput?.removeEventListener('blur', () => {});
    };
  }, []);

  return (
    <div>
      {/* <!-- component --> */}
      <div className="flex max-w-sm text-xs items-center justify-center">
        <div className="relative group px-2">
          {/* <!-- Search input --> */}
          <input
            id="search-input"
            className="block w-full text-xs px-2 py-1 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
            type="text"
            placeholder="Search items"
          />
          <div
            id="dropdown-menu"
            className="hidden absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1"
          >
            {/* <!-- Dropdown content goes here --> */}
            <div
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
            >
              Uppercase
            </div>
            <div
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
            >
              Lowercase
            </div>
            <div
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
            >
              Camel Case
            </div>
            <div 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
            >
              Kebab Case
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownSearch;
