'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {}

const Header = (props: Props) => {
  return (
    <div className='z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex'>
      <p className='header-heading'>
        MEME Generator
      </p>
      <div className='header-logo-container'>
        <div
          className='pointer-events-none flex place-items-center gap-2 p-8 lg:p-0'
        >
          Created by{' '}
          <Link href={'/'} target='_blank'>
            <Image
              src={'/mylogo.svg'}
              width={220}
              height={48}
              alt=''
              priority={true}
              className='animate-pulse duration-75'
            />
          </Link>
        </div>
      </div>
    </div>
  )
};

export default Header;