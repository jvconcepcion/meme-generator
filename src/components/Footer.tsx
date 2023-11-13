'use client';

import { FooterProps } from '@interface/components/footer';
import React from 'react';

const Footer: React.FC<FooterProps> = ({
  style = {},
  children = '',
  copyRightLabel = ''
}) => {
  return (
    <div
      className='flex flex-col items-center justify-center w-full lg:mb-0 border-t border-t-[#f4f4f4]/40 h-full'
      style={style}
    >
      {children}
      <div className='text-xs my-5 md:my-0 sm:text-sm'>
        Copyright © {copyRightLabel}
      </div>
    </div>
  )
};

export default Footer;