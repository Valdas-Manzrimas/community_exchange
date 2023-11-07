import React, { useState } from 'react';

interface FilterContainerProps {
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
  onToggleView: (isListView: boolean) => void;
}

const FilterContainer: React.FC<FilterContainerProps> = ({
  onFilterChange,
  onSortChange,
  onToggleView,
}) => {
  const [isListView, setIsListView] = useState(false);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  const handleToggleView = () => {
    setIsListView(!isListView);
    onToggleView(!isListView);
  };

  return (
    <div className='w-full h-8 bottom-b-2 flex items-center relative'>
      <label htmlFor='filter-select' className='mr-2'>
        Filter:
      </label>
      <select id='filter-select' onChange={handleFilterChange}>
        <option value=''>All</option>
        <option value='active'>Active</option>
        <option value='completed'>Completed</option>
      </select>
      <span className='ml-8 mr-2 text-sm font-medium text-narvik-800'>
        List view
      </span>
      <label className='relative inline-flex items-center cursor-pointer'>
        <input
          type='checkbox'
          value=''
          className='sr-only peer'
          onChange={handleToggleView}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-narvik-700"></div>
      </label>
      <button
        type='button'
        className='text-dark border-dark bg-gradient-to-r from-narvik-200 via-narvik-500 to-narvik-800 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-2 py-0.5 text-center absolute right-0 active:border-narvik-200 active:shadow-2'
      >
        Create Product
      </button>{' '}
    </div>
  );
};

export default FilterContainer;
