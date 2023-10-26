'use client';

import { Variants, motion } from 'framer-motion';

const parentVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0 } }
}
const Bar = () => {
  return (
    <motion.div
      variants={parentVariant}
      initial='show'
      animate='show'
      className='grid place-content-center bg-[rgba(65,47,123,0.15)] px-4 py-24'
    >
      <BarLoader />
    </motion.div>
  );
};

const variants: Variants = {
  initial: {
    scaleY: 0.5,
    opacity: 0.1,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: 'mirror',
      duration: 1,
      ease: 'circIn',
    },
  },
};

const BarLoader = () => {
  return (
    <motion.div
      transition={{
        staggerChildren: 0.25,
      }}
      initial='initial'
      animate='animate'
      className='flex gap-1'
    >
      <motion.div variants={variants} className='h-12 w-2 bg-white' />
      <motion.div variants={variants} className='h-12 w-2 bg-white' />
      <motion.div variants={variants} className='h-12 w-2 bg-white' />
      <motion.div variants={variants} className='h-12 w-2 bg-white' />
      <motion.div variants={variants} className='h-12 w-2 bg-white' />
    </motion.div>
  );
};

export default Bar;