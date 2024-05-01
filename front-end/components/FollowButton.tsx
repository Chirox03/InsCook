// followButton.tsx

import React, { useState } from 'react';

const FollowButton: React.FC = () => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const toggleFollow = () => {
    setIsFollowing(prevState => !prevState);
  };

  return (
    <button
      onClick={toggleFollow}
      className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
        isFollowing ? 'mb-0 bg-gray-300 border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-5 py-2 me-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700' : 'mb-0  border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-5 py-2 me-2  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
      } text-black font-bold`}
    >
      {isFollowing ? 'Following' : 'Follow'}
    </button>
  );
};

export default FollowButton;
