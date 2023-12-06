import React from 'react';
import { useNavigate } from 'react-router-dom';

interface PlanCardProps {
  planName: string;
  price: number;
  features: string[];
}

const PlanCard: React.FC<PlanCardProps> = ({ planName, price, features }) => {
  const navigate = useNavigate();

  const selectPlan = (planName: string) => {
    navigate('/register-community', { state: { planName } });
  };

  return (
    <div className='plan-card bg-white rounded-lg shadow-md p-4'>
      <h3 className='text-xl font-bold mb-2'>{planName}</h3>
      <p className='text-gray-600 mb-4'>${price}/month</p>
      <ul className='mb-4'>
        {features.map((feature, index) => (
          <li key={index} className='flex items-center'>
            <svg
              className='w-4 h-4 mr-2 text-green-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 13l4 4L19 7'
              />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        className='bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded'
        onClick={(event) => {
          event.preventDefault();
          selectPlan(planName);
        }}
      >
        Create Community
      </button>
    </div>
  );
};

export default PlanCard;
