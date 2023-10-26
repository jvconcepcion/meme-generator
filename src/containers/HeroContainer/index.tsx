'use client';

import React, { useState, useEffect } from 'react';
import { Bar, Slider } from '@components';

const HeroContainer: React.FC = () => {
  const [memeList, setMemeList] = useState([]);

  // useEffect(() => {
  //   let mounted = true;

  //   if (mounted) {

  //     const fetchPosts = async () => {
  //       const response = await fetch('/api/memes');
  //       const { data } = await response.json();
  //       setMemeList(data.memes);
  //     }
  //     fetchPosts();
  //   }
  // }, [])

  return (
    <section className="mb-32 text-center lg:w-full lg:mb-0">
      <div className='hero-items-container'>
      <Slider />
      </div>
    </section>
  )
};

export default HeroContainer;