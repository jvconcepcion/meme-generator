'use client'

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { ModalProps } from '@interface/components/modal';

const Modal: React.FC<ModalProps> = ({
  isVisible = false,
  modalTitle = 'Modal Title',
  closeModalFunc =  () => console.log('Close Modal'),
  children = '',
}) => {

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key='modal'
          className='bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='rounded-md sm:rounded-lg shadow-md sm:m-2 m-2 max-h-[27rem] xs:max-h-[35rem] sm:max-h-full overflow-y-scroll sm:overflow-y-auto
              scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-h-6 relative'
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex flex-row items-center justify-between border-b border-gray-200 px-1 pb-2 pt-3 w-full bg-gradient-to-br from-[#191532] to-[#131424]`}>
              <h2 className='text-xs sm:text-base font-bold text-accent ml-2 animate-pulse duration-300'>{modalTitle}</h2>
              <span
                className='cursor-pointer text-accent text-base sm:text-xl '
                onClick={closeModalFunc}
              >
                <AiOutlineClose className='animate-pulse duration-300' />
              </span>
            </div>
            <div className='flex flex-col gap-4 border-gray-200 bg-gradient-to-br from-[#191532] to-[#131424] p-3 overflow-x-hidden'>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )
      }
    </AnimatePresence >
  )
}

export default Modal