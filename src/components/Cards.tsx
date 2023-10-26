'use client';

import { motion } from 'framer-motion';
import { RxArrowTopRight } from 'react-icons/rx';

const Cards: React.FC<{ [key: string]: string }> = ({
  title = ''
}) => {
  return (
    <div
      className='bg-[rgba(65,47,123,0.15)] h-max rounded-lg p-6 flex sm:flex-col gap-x-6 sm:gap-x-0 
      group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300'
    >
      <div className='mb-8'>
        <p className='max-w-[350px] leading-normal text-xs sm:text-base text-left'>{title}</p>
      </div>
      <div className='text-3xl'>
        <RxArrowTopRight className='group-hover:rotate-45 group-hover:text-accent transition-all duration-300' />
      </div>
    </div>
  );
};

export default Cards;