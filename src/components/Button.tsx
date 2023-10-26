import { ButtonProps } from '@interface/components/button';
import React from 'react';

const Button: React.FC<ButtonProps> = ({
  buttonColor = '#F13024',
  disable = false,
  style = {},
  onClick = (e) => console.log(e),
  children = ''
}) => {

  const disabledStyle: React.CSSProperties = {
    cursor: 'not-allowed',
    pointerEvents: 'none' as 'none',
    backgroundColor: '#c9c9c9',
  };
  const buttonStyle: React.CSSProperties = {
    color: buttonColor,
    ...style,
    ...(disable ? disabledStyle : {}),
  };

  return (
    <button
      className='p-1 border shadow-md rounded-sm hover:bg-[#f4f4f4]'
      style={buttonStyle}
      onClick={onClick}
    >{children}</button>
  )
};

export default Button;