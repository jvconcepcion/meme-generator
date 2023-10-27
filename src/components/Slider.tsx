'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { RxArrowTopRight } from 'react-icons/rx';
import { SliderProps } from '@interface/components/slider';
import { Cards } from '@components';
import { fadeIn, fadeOut } from '@utils/framer-variants';

const slidesData = [
  {
    title: '',
    link: '',
    imgLink: ''
  },
  {
    title: '',
    link: '',
    imgLink: ''
  },
  {
    title: '',
    link: '',
    imgLink: ''
  },
  {
    title: '',
    link: '',
    imgLink: ''
  },
  {
    title: '',
    link: '',
    imgLink: ''
  },
  {
    title: '',
    link: '',
    imgLink: ''
  },

];

const Slider: React.FC<SliderProps> = ({
  items = slidesData,
  params = {
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 15,
      }
    },
    loop: true,
    freeMode: true,
    speed: 5000,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    autoplay: {
      delay: 1,
      pauseOnMouseEnter: false,
      disableOnInteraction: false,
    }
  }
}) => {
  const [areSlidesLoaded, setAreSlidesLoaded] = useState<boolean>(false);

  const SliderSkeleton = () => (
    <div
      role='status'
      className='animate-pulse h-48'
    >
      <div className='w-full h-48 bg-[rgba(65,47,123,0.15)] rounded-lg' />
    </div>
  )

  return (
    <>
      <motion.div
        variants={fadeIn(areSlidesLoaded)}
        initial='hidden'
        animate='visible'
        className={`h-48 ${!areSlidesLoaded && '!hidden'}`}
      >
        <Swiper
          {...params}
          modules={[Autoplay, FreeMode, Pagination]}
          onInit={() => setAreSlidesLoaded(false)}
          onAfterInit={() => setAreSlidesLoaded(true)}
          className='h-full'
        >
          {items && items.map((item, i) => (
            <SwiperSlide key={i}>
              <Cards {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
      {!areSlidesLoaded && <SliderSkeleton />}
    </>
  )
};

export default Slider;