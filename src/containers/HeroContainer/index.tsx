'use client';

import React, { useState, useEffect } from 'react';
import { Slider } from '@components';

const HeroContainer: React.FC<{ [key: string]: any[] }> = ({ memeList = [] }) => {
  const [memeCollection, setMemeCollection] = useState<any[]>([]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (!memeList) return;

      const memes = memeList.map(({ id, name, url }) => ({ title: name, link: url, imgLink: url }));
      setMemeCollection(memes)
    }
  }, [])

  return (
    <section className="mb-32 text-center lg:w-full lg:mb-0">
      <div className='hero-items-container'>
        <Slider items={memeCollection} />
      </div>
    </section>
  )
};

export default HeroContainer;