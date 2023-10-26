'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { RxArrowTopRight } from 'react-icons/rx';
import { SliderProps } from '@interface/components/slider';
import { Bar, Cards } from '@components';

const serviceData = [
  {
    title: 'Branding',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Design',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Development',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Copywriting',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'SEO',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
];

const Slider: React.FC<SliderProps> = ({
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
      disableOnInteraction: false,
    }
  }
}) => {
  const [areSlidesLoaded, setAreSlidesLoaded] = useState<boolean>(false);

  return (
    <>
      <Swiper
        {...params}
        modules={[Autoplay, FreeMode, Pagination]}
        onInit={() => setAreSlidesLoaded(false)}
        onAfterInit={() => setAreSlidesLoaded(true)}
        className={`h-auto ${!areSlidesLoaded && '!hidden'}`}
      >
        {serviceData.map((item, i) => (
          <SwiperSlide key={i}>
            <Cards title={item.description} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Bar />
    </>
  )
};

export default Slider;