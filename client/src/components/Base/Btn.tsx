import React from 'react';

type ButtonProps = {
  style: 'primary' | 'secondary' | 'tertiary';
  onClick: () => void;
  children: React.ReactNode;
};

const Btn: React.FC<ButtonProps> = ({ style, onClick, children }) => {
  let buttonStyle = '';

  if (style === 'primary') {
    buttonStyle = 'bg-primary text-white';
  } else if (style === 'secondary') {
    buttonStyle = 'bg-tertiary text-dark';
  } else if (style === 'tertiary') {
    buttonStyle = 'bg-transparent text-primary';
  }

  return (
    <button
      className={`px-8 py-2 rounded-full ${buttonStyle}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Btn;
