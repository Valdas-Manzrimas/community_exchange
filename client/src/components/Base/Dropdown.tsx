import { useState, useRef, useEffect, ReactNode } from 'react';

type DropdownProps = {
  buttonText: string | ReactNode;
  buttonStyles?: string;
  options: string[];
  replaceButtonText?: boolean;
  onOptionClick?: (option: string) => void;
};

const Dropdown = ({
  buttonText,
  buttonStyles = 'text-white inline-flex w-full justify-center gap-x-0.5 pl-1 pr-3 text-sm font-semibold hover:bg-primary',
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
    <div className='relative text-left z-10' ref={dropdownRef}>
      <div className='flex items-center'>
        <button
          type='button'
          className={`${buttonStyles}`}
          aria-haspopup='true'
          aria-expanded='true'
          onClick={() => setIsOpen(!isOpen)}
        >
          {replaceButtonText ? selectedOption || buttonText : buttonText}
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
                className='block px-4 py-2 text-sm text-primary hover:bg-gray-200 w-full text-left'
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
