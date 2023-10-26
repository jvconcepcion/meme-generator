'use client';

import React, { useState } from 'react';
import { MdOutlineBorderColor, MdAddCircleOutline } from 'react-icons/md'
import { PiMinus, PiPlus } from 'react-icons/pi'
import { BsBorderWidth } from 'react-icons/bs'
import { Button, ButtonGroup, ColorPicker, Textfield, Tooltip } from '@components';
import { TextEditorProps } from '@interface/containers/home-container';
import { ButtonGroupProps } from '@interface/components/button-group';

const MemeTextEditor: React.FC<TextEditorProps> = ({
  disabled = true,
  textfields,
  actions = {
    colorChange: () => console.log('change coolor'),
    addTextfieldFunc: () => console.log('Add textfield'),
    removeTextfieldFunc: () => console.log('Remove textfield'),
  }
}) => {

  const buttonGroupSchema: ButtonGroupProps['schema'] = [
    {
      name: 'Remove Textfield',
      disable: textfields.length === 2,
      style: { borderRight: 'none' },
      onClick: actions.removeTextfieldFunc,
      component: <PiMinus size={20} />
    },
    {
      name: 'Add Textfield',
      disable: textfields.length === 4,
      style: { borderLeft: 'none' },
      onClick: actions.addTextfieldFunc,
      component: <PiPlus size={20} />
    },
  ]

  return (
    <div className={`meme-text-editor ${disabled && 'pointer-events-none'}`}>
      <nav className='sticky top-0 px-2 pt-2 pb-1 border-b flex items-center gap-1 bg-white'>
        <ColorPicker label='Font Color' tooltipPosition='right' onClick={(e) => actions.colorChange(e, 'font')} />
        <ColorPicker label='Border Color' tooltipPosition='right' buttonPicker={<MdOutlineBorderColor size={20} />} onClick={(e) => actions.colorChange(e, 'border')} />
        <ButtonGroup schema={buttonGroupSchema} />
      </nav>
      <div className='px-4 sm:px-2 flex flex-col'>

        <div className='w-full flex flex-col items-center gap-2'>
          {textfields && textfields.map((items, i) => (
            <div key={i} className='w-full'>
              <span className={`divider-horizontal ${i !== 0 && 'border-t'}`} />
              <Textfield {...items} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};

export default MemeTextEditor;