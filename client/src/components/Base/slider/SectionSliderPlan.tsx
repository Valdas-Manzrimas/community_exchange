import React, { FC } from 'react';
import Heading from '../../layout/Heading';
import PlanCard from '../PlanCard';
import MySlider from './MySlider';

export interface SectionSliderPostsProps {
  className?: string;
  heading: string;
  subHeading?: string;
  planCardName?: 'Free' | 'Standard' | 'Active' | 'Premium';
  perView?: 1 | 2 | 4;
}

const plans = [
  {
    planName: 'Free',
    price: 0,
    features: ['Up to 6 members', 'Up to 3GB storage', 'Email support'],
    notIncluded: ['semper risus in', 'metus dictum at', 'semper risus in'],
  },
  {
    planName: 'Standard',
    price: 6,
    features: [
      'Up to 12 members',
      'Up to 12GB storage',
      'Email support',
      'semper risus in',
    ],
    notIncluded: ['metus dictum at', 'semper risus in'],
  },
  {
    planName: 'Active',
    price: 24,
    features: [
      'Up to 64 members',
      'Up to 64GB storage',
      'Email support',
      'semper risus in',
      'metus dictum at',
    ],
    notIncluded: ['semper risus in'],
  },
  {
    planName: 'Premium',
    price: 64,
    features: [
      'Up to 128 members',
      'Up to 108GB storage',
      'Email support',
      'semper risus in',
      'metus dictum at',
      'semper risus in',
    ],
  },
];

const SectionSliderPosts: FC<SectionSliderPostsProps> = ({
  heading,
  subHeading,
  className = '',
  //   planCardName = 'Free',
  perView = 4,
}) => {
  return (
    <div className={`${className}`}>
      <Heading desc={subHeading} isCenter>
        {heading}
      </Heading>

      <MySlider
        data={plans}
        renderItem={(item, indx) => (
          <PlanCard
            key={indx}
            planName={item.planName}
            price={item.price}
            features={item.features}
            notIncluded={item.notIncluded}
          />
        )}
        itemPerRow={perView}
      />
    </div>
  );
};

export default SectionSliderPosts;
