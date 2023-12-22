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
    <div className='h-full bg-gray-100 p-12 rounded-2xl'>
      <h5 className='mb-4 text-xl font-medium text-gray-500'>{planName}</h5>
      <div className='flex items-baseline text-gray-900'>
        <span className='text-3xl font-semibold'>€</span>
        <span className='text-5xl font-extrabold tracking-tight'>{price}</span>
        <span className='ml-1 text-xl font-normal text-gray-500'>/month</span>
      </div>
      <hr className='my-5 text-brown-700' />
      <ul className='my-7 space-y-5 h-[150px]'>
        {features.map((feature) => (
          <li className='flex space-x-3'>
            <svg
              className='h-5 w-5 shrink-0 text-cyan-600'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                clipRule='evenodd'
              />
            </svg>
            <span className='text-base font-normal leading-tight text-gray-500'>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <button
        type='button'
        onClick={() => selectPlan(planName)}
        className={`inline-flex w-full justify-center rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 ${
          planName !== 'Free' && 'opacity-50'
        }`}
        disabled={planName !== 'Free'}
      >
        Choose plan
      </button>
      {planName !== 'Free' && (
        <p className='text-center text-error pt-2'>Comming soon</p>
      )}
    </div>
  );
};

export default PlanCard;
