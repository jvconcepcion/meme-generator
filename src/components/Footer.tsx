'use client';

import React from 'react';

type Props = {}

const Footer: React.FC<{ children: React.ReactNode }> = ({ children = '' }) => {
  return (
    <div className="mb-32 text-center lg:w-full lg:mb-0">
      {children}
    </div>
  )
};

export default Footer;