'use client';

import Link from 'next/link';
import { RxArrowTopRight } from 'react-icons/rx';
import { CardsProps } from '@interface/components/cards';

const Cards: React.FC<CardsProps> = ({
  title = '',
  link = '/',
  imgLink = '',
  style = {},
}) => {

  return (
    <div
      className='bg-[rgba(65,47,123,0.15)] h-full rounded-lg p-6 flex sm:flex-col gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300 bg-cover bg-center'
      style={{
        backgroundImage: `url(${imgLink})`,
        ...style
      }}
    >
      <div className='mb-8'>
        <p
          className='max-w-[350px] leading-normal text-xs sm:text-base text-left drop-shadow-md'
          style={{ textShadow: '3px 3px 2px rgba(0, 0, 0, 1)' }}
        >{title}</p>
      </div>
      <Link
        className='text-3xl'
        href={link}
        target='_blank'
      >
        <RxArrowTopRight
          className='group-hover:rotate-45 group-hover:text-accent transition-all duration-300'
        />
      </Link>
    </div>
  );
};

export default Cards;