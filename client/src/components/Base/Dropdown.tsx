// Dropdown.tsx

// TODO: Make dropdown options load only when the dropdown is clicked
// For ex when fetching user products in OrderPage.tsx

import { useState, useRef, useEffect, ReactNode } from 'react';
import useOnClickOutside from '../utils/useOnClickOutside';

type Option = {
  key: string | number;
  value: ReactNode;
  displayValue?: string;
};

type DropdownProps = {
  buttonText: string | ReactNode;
  buttonStyles?: string;
  options: Option[];
  optionStyles?: string;
  replaceButtonText?: boolean;
  onOptionClick?: (key: string | number, displayValue?: string) => void;
  label?: string;
  labelStyles?: string;
};

const Dropdown = ({
  buttonText,
  buttonStyles = 'text-primary border-2 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
  options,
  optionStyles = 'block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900',
  replaceButtonText = true,
  onOptionClick,
  label,
  labelStyles = `block text-md font-medium `,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onOptionClick) {
      onOptionClick(option.key, option.displayValue);
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
    <div className='relative inline-block text-left'>
      <div>
        {label && <label className={labelStyles}>{label}</label>}
        <button
          type='button'
          className={`${buttonStyles}`}
          aria-haspopup='true'
          aria-expanded='true'
          onClick={() => setIsOpen(!isOpen)}
        >
          {replaceButtonText
            ? selectedOption?.displayValue || buttonText
            : buttonText}
        </button>
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className='origin-top-right absolute left-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
        >
          <div
            className='py-1 min-w-[275px]'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            {options.map((option) => (
              <button
                key={option.key}
                className={optionStyles}
                role='menuitem'
                onClick={() => handleOptionClick(option)}
              >
                {option.value}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
