import { useState } from 'react';

type DropdownProps = {
  buttonText: string;
  buttonStyles?: string;
  options: string[];
  replaceButtonText?: boolean;
};

const Dropdown = ({
  buttonText,
  buttonStyles = 'bg-blue-500 text-white',
  options,
  replaceButtonText = true,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (!replaceButtonText) {
      setIsOpen(false);
    }
  };

  return (
    <div className='relative text-left'>
      <div>
        <button
          type='button'
          className={`${buttonStyles}`}
          id='options-menu'
          aria-haspopup='true'
          aria-expanded='true'
          onClick={() => setIsOpen(!isOpen)}
        >
          {replaceButtonText ? selectedOption || buttonText : buttonText}
          <svg
            className={`-mr-1 ml-2 h-5 w-5 transition ${
              isOpen ? 'transform rotate-180' : ''
            }`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-32 bg-narvik-300 focus:outline-none '>
          <div
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            {options.map((option) => (
              <button
                key={option}
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left'
                role='menuitem'
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
