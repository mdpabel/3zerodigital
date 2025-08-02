'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import SearchModal from './command-menu';

const SearchComponent = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      {/* Search Button */}
      <button
        type='button'
        onClick={handleOpenSearch}
        className='p-2 rounded-lg transition-colors cursor-pointer'>
        <Search className='w-5 h-5 text-gray-400' />
      </button>

      {/* Search Modal */}
      {isSearchOpen && (
        <SearchModal isOpen={isSearchOpen} onClose={handleCloseSearch} />
      )}
    </>
  );
};

export default SearchComponent;
