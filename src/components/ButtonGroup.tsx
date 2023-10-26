'use client';

import React from 'react';
import { PiMinus, PiPlus } from 'react-icons/pi'
import { ButtonGroupProps } from '@interface/components/button-group';
import { Button, Tooltip } from '@components';

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  schema = [
    {
      name: 'Remove Textfield',
      buttonColor: '#F13024',
      disable: false,
      style: { borderRight: 'none' },
      onClick: (e) => console.log(e),
      component: <PiMinus size={20} />
    },
    {
      name: 'Add Textfield',
      buttonColor: '#F13024',
      disable: false,
      style: { borderLeft: 'none' },
      onClick: (e) => console.log(e),
      component: <PiPlus size={20} />
    },
  ]
}) => {

  return (
    <div className='flex items-center'>
      {schema && schema.map((item, i) => (
        <div
          key={i}
        >
          <Tooltip
            name={item.name}
            textSize='9'
            textBold={true}
            capitalize={true}
            position='right'
          >
            <Button
              onClick={item.onClick}
              style={{ ...item.style }}
              disable={item.disable}
            >{item.component}</Button>
          </Tooltip>
        </div>
      ))}
    </div>
  )
};

export default ButtonGroup;