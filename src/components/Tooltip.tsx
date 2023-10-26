'use client';

import { useState } from 'react';
import { TooltipProps } from '@interface/components/tooltip';

const Tooltip: React.FC<TooltipProps> = ({
  name = 'Tooltip',
  position = 'top',
  color = 'white',
  backgroundColor = '#212121',
  textSize = '12',
  textBold = true,
  capitalize = true,
  children = '',
}) => {
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const Triangle = ({ position = 'top' }) => {
    switch (position) {
      case 'top':
        return <div className='border-solid border-t-8 border-x-transparent border-x-[6px] border-b-0 absolute left-[0.3rem] bottom-[-0.4rem]' style={{ borderTopColor: backgroundColor }} />
      case 'right':
        return <div className='border-solid border-r-8 border-y-transparent border-y-[6px] border-l-0 absolute -left-2 top-[0.338rem]' style={{ borderRightColor: backgroundColor }} />
      case 'bottom':
        return <div className='border-solid border-b-8 border-x-transparent border-x-[6px] border-t-0 absolute left-[0.3rem] top-[-0.4 rem]' style={{ borderBottomColor: backgroundColor }} />
      case 'left':
        return <div className='border-solid border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2 top-[0.338rem]' style={{ borderLeftColor: backgroundColor }} />
      default:
        return <div className='border-solid border-t-8 border-x-transparent border-x-[6px] border-b-0 absolute left-[0.3rem] bottom-[-0.53rem]' style={{ borderTopColor: backgroundColor }} />
    }
  };

  const usePosition = (position: string) => {
    switch (position) {
      case 'top':
        return { bottom: '100%', left: '0' };
      case 'bottom':
        return { top: '100%', left: '0' };
      case 'left':
        return { right: '50%', top: '-20%' };
      case 'right':
        return { left: '50%', top: '-20%' };
      default:
        break;
    }
  };

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const tooltipPosition = usePosition(position);
  const tooltipStyle = {
    display: isTooltipVisible ? 'block' : 'none',
    ...tooltipPosition,
  };

  return (
    <div className='relative group inline-block' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className='absolute z-10 pointer-events-none' style={tooltipStyle}>
        <div className='relative p-[6px] rounded-[3px]' style={{ color, backgroundColor }}>
          <div
            className='leading-none whitespace-nowrap'
            style={{
              fontSize: `${textSize}px`,
              fontWeight: `${textBold ? 'bold' : 'normal'}`,
              textTransform: `${capitalize ? 'capitalize' : 'none'}`,
            }}>
            {name}
          </div>
          {/* <Triangle position={position} /> */}
        </div>
      </div>
      {children}
    </div >
  )
}
export default Tooltip;