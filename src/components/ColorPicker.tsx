'use client';

import React, { useState } from 'react';
import { RgbaColorPicker, RgbaColor } from 'react-colorful';
import { ColorPickerProps } from '@interface/components/color-picker';
import { AiOutlineFontColors, AiFillCheckCircle } from 'react-icons/ai';
import { Tooltip, Button, Modal } from '@components';
import { hexToRGBA } from '@utils/helpers';

const ColorPicker: React.FC<ColorPickerProps> = ({
  label = 'Color Picker',
  value = '#FFFFFF',
  buttonPicker = <AiOutlineFontColors size={20} />,
  buttonColor = '#F13024',
  tooltipPosition = 'top',
  onClick = (e) => console.log(e)
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [color, setColor] = useState<RgbaColor>({ r: 255, g: 255, b: 255, a: 100 });

  const DEFAULT_COLORS = [
    '#000000',
    '#FFFFFF',
    '#808080',
    '#FF0000',
    '#008000',
    '#0000FF',
  ];

  const handleChangeColor = (e: RgbaColor) => setColor(e);

  const handleSelectColor = (e: RgbaColor) => {
    onClick(e);
    setOpen(false);
  };

  return (
    <div>
      <Tooltip
        name={label}
        textSize='9'
        textBold={true}
        capitalize={true}
        position={tooltipPosition}
      >
        <Button
          buttonColor={buttonColor}
          onClick={() => setOpen(true)}
        >{buttonPicker}</Button>
      </Tooltip>
      {open && (
        <Modal modalTitle={label} isVisible={open} closeModalFunc={() => setOpen(false)}>
          <div className='w-64 flex flex-col gap-3'>
            <div className='color-picker'>
              <RgbaColorPicker color={color} onChange={handleChangeColor} />
            </div>
            <div className='flex flex-row justify-around'>
              <ul className='flex space-x-2 w-full'>
                {DEFAULT_COLORS.map(variant => (
                  <li className='list-none' key={variant}>
                    <span
                      className='default-color-tile'
                      style={{ backgroundColor: variant }}
                      onClick={() => setColor(hexToRGBA(variant, 1))}
                    ></span>
                  </li>
                ))}
              </ul>
              <span className='text-xl cursor-pointer' onClick={() => handleSelectColor(color)}>
                <AiFillCheckCircle size={25} />
              </span>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
};

export default ColorPicker;