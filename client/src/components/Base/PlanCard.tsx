import React from 'react';
import { useNavigate } from 'react-router-dom';
import Btn from './Btn';

interface PlanCardProps {
  planName: string;
  price: number;
  features: string[];
  notIncluded?: string[];
}

const PlanCard: React.FC<PlanCardProps> = ({
  planName,
  price,
  features,
  notIncluded,
}) => {
  const navigate = useNavigate();

  const selectPlan = (planName: string) => {
    navigate('/register-community', { state: { planName } });
  };

  return (
    <div className='h-full relative bg-gray-100 px-8 py-8 mx-4 rounded-[36px] font-[Quicksand] min-w-[270px] min-h-fit'>
      <div className='flex items-baseline text-gray-900 justify-center'>
        <span className='text-5xl font-normal tracking-tight mr-2'>
          {price}
        </span>
        <span className='text-xl font-normal'>€</span>
        <span className='ml-1 text-xl font-normal text-gray-500'>/month</span>
      </div>
      <hr className='my-5 text-brown-700' />
      <ul className='my-7 space-y-3'>
        {features.map((feature) => (
          <li className='flex items-center space-x-3'>
            <svg
              width='15'
              height='11'
              viewBox='0 0 15 11'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g id='Group'>
                <path
                  id='Vector'
                  d='M14.7687 1.33442L5.29552 10.7094C5.22221 10.782 5.13514 10.8397 5.03931 10.879C4.94347 10.9183 4.84075 10.9385 4.737 10.9385C4.63326 10.9385 4.53053 10.9183 4.4347 10.879C4.33886 10.8397 4.2518 10.782 4.17848 10.7094L0.231346 6.80316C0.0832178 6.65657 0 6.45774 0 6.25043C0 6.04311 0.0832178 5.84429 0.231346 5.69769C0.379475 5.5511 0.580381 5.46874 0.789866 5.46874C0.999352 5.46874 1.20026 5.5511 1.34839 5.69769L4.737 9.05218L13.6516 0.228949C13.7997 0.0823553 14.0006 -1.54462e-09 14.2101 0C14.4196 1.54462e-09 14.6205 0.0823553 14.7687 0.228949C14.9168 0.375544 15 0.574368 15 0.781684C15 0.988999 14.9168 1.18782 14.7687 1.33442Z'
                  fill='#121212'
                />
              </g>
            </svg>
            <span className='text-base leading-tight text-gray-500'>
              {feature}
            </span>
          </li>
        ))}
        {notIncluded?.map((feature) => (
          <li className='flex space-x-3 items-center text-gray-600'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='15'
              height='2'
              viewBox='0 0 15 2'
              fill='none'
            >
              <path
                d='M15 0.78125C15 0.98845 14.9342 1.18717 14.8169 1.33368C14.6997 1.48019 14.5408 1.5625 14.375 1.5625H0.625C0.45924 1.5625 0.300269 1.48019 0.183058 1.33368C0.0658481 1.18717 0 0.98845 0 0.78125C0 0.57405 0.0658481 0.375336 0.183058 0.228823C0.300269 0.0823102 0.45924 0 0.625 0H14.375C14.5408 0 14.6997 0.0823102 14.8169 0.228823C14.9342 0.375336 15 0.57405 15 0.78125Z'
                fill='#929292'
              />
            </svg>
            <span className='text-base leading-tight text-gray-500'>
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <div className='flex justify-center'>
        <Btn
          children={`Get ${planName.toUpperCase()}`}
          onClick={() => selectPlan(planName)}
          disabled={planName !== 'Free'}
          style='tertiary'
        />
      </div>

      {planName !== 'Free' && (
        <p className='text-center text-error pt-2 absolute bottom-[10px] left-0 w-full'>
          Comming soon
        </p>
      )}
    </div>
  );
};

export default PlanCard;
