import React from 'react';

type ButtonProps = {
  style: 'primary' | 'secondary' | 'tertiary';
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

const Btn: React.FC<ButtonProps> = ({
  style,
  onClick,
  children,
  disabled,
  className,
  type = 'button',
}) => {
  let buttonStyle = '';

  if (style === 'primary') {
    buttonStyle = 'bg-primary text-white';
  } else if (style === 'secondary') {
    buttonStyle = 'bg-tertiary text-dark';
  } else if (style === 'tertiary') {
    buttonStyle = 'bg-transparent text-primary border border-tertiary';
  }

  return (
    <button
      className={`px-8 py-2 rounded-full flex items-center justify-center ${buttonStyle} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Btn;
