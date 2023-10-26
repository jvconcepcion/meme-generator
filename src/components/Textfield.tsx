import { TextFieldProps } from '@interface/components/textfield';
import React from 'react'

const Textfield: React.FC<TextFieldProps> = ({
  id = 'textfield',
  labelName = '',
  value = '',
  withLabel = true,
  onChange = (e) => e
}) => {
  return (
    <div className='w-full'>
      {withLabel && <label htmlFor={`${id}-input`} className='block text-xs font-medium leading-6 text-gray-900 capitalize'>{labelName}</label>}
      <div className='mt-2 rounded-md shadow-sm'>
        <input
          type='text'
          name={id}
          id={`${id}-input`}
          className='block w-full rounded-sm border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-xs sm:placeholder:text-base
            placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 placeholder:text-ash/10 placeholder:capitalize'
          placeholder={labelName}
          onChange={onChange}
        />
      </div>
    </div>
  )
};

export default Textfield;