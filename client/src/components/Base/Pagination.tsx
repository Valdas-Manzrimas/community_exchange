import React from 'react';

interface PaginationProps {
  totalPages?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages = 0,
  currentPage,
  onPageChange,
}) => {
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <div className='flex justify-center my-4'>
      {totalPages > 1 &&
        pages.map((page) => (
          <button
            key={page}
            className={`mx-1 px-3 py-2 text-narvik-600 border border-narvik rounded-lg focus:outline-none ${
              currentPage === page ? 'bg-narvik-200' : ' bg-white'
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
