import { useState, useRef, useEffect } from 'react';

type DropdownProps = {
  buttonText: string;
  buttonStyles?: string;
  options: string[];
  replaceButtonText?: boolean;
  onOptionClick?: (option: string) => void;
};

const Dropdown = ({
  buttonText,
  buttonStyles = 'text-narvik-800 inline-flex w-full justify-center gap-x-0.5 pl-1 pr-3 text-sm font-semibold hover:bg-gray-50',
  options,
  replaceButtonText = true,
  onOptionClick,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onOptionClick) {
      onOptionClick(option);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative text-left' ref={dropdownRef}>
      <div>
        <button
          type='button'
          className={`${buttonStyles}`}
          aria-haspopup='true'
          aria-expanded='true'
          onClick={() => setIsOpen(!isOpen)}
        >
          {replaceButtonText ? selectedOption || buttonText : buttonText}
          <svg
            className={`h-5 w-5 transition ${
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
        <div className='absolute right-0 mt-2 w-32 bg-white focus:outline-none '>
          <div
            className='py-1'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            {options.map((option) => (
              <button
                key={option}
                className='block px-4 py-2 text-sm text-narvik-800 hover:bg-gray-100 hover:text-gray-900 w-full text-left'
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
