import React from 'react';

interface PaginationProps {
  totalPages?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <div className='flex justify-center my-4'>
      {pages.map((page) => (
        <button
          key={page}
          className={`mx-1 px-3 py-2 bg-white border border-gray-400 rounded-lg focus:outline-none ${
            currentPage === page ? 'text-blue-500' : 'text-gray-700'
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
