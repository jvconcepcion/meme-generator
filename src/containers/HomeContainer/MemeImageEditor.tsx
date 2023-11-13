'use client'

import React, { useState, useRef, useEffect } from 'react';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import { LuFlipHorizontal2, LuRotateCcw, LuRotateCw } from 'react-icons/lu';
import { fabric } from 'fabric';
import { Tooltip } from '@components';
import { Modal } from '@components';
import { ImageEditorProps } from '@interface/containers/home-container';

const MemeImageEditor: React.FC<ImageEditorProps> = ({ config }) => {
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const modalCanvasRef = useRef<fabric.Canvas | null>(null);
  const [rotation, setRotation] = useState<number>(0);

  const {
    uploadedImage,
    saveMemeFunc,
    modalProps,
  } = config;

  useEffect(() => {
    if (!modalContainerRef.current) return;

    if (!uploadedImage) return;
    const offsetWidth = modalContainerRef.current.offsetWidth;
    const canvasWidth = modalContainerRef.current.clientWidth;
    const containerStyle = modalContainerRef.current.style;

    // Load the image onto the canvas
    fabric.Image.fromURL(uploadedImage, (img) => {

      // Get the image dimensions
      const imgWidth = img.width!;
      const imgHeight = img.height!;

      // Calculate the container width based on the image aspect ratio
      const containerWidth = Math.min(canvasWidth, 490);

      // Calculate the scaled canvas height with a minimum of 370px
      const containerHeight = Math.max(370, (containerWidth / imgWidth) * imgHeight);

      // Set the canvas dimensions
      containerStyle.width = containerWidth + 'px';
      containerStyle.height = containerHeight + 'px';

      const canvas = new fabric.Canvas('imgCanvas', {
        width: containerWidth,
        height: containerHeight,
      });

      // Scale and position the image
      img.scale(containerWidth / imgWidth);

      canvas.clear().add(img);
      canvas.setActiveObject(img);
      modalCanvasRef.current = canvas;

      canvas.on('object:scaling', (options) => {
        const modifiedObject = options.target as fabric.Image;
        if (modifiedObject === img) {
          const newWidth = modifiedObject.width! * modifiedObject.scaleX!;
          const newHeight = modifiedObject.height! * modifiedObject.scaleY!;

          if (newWidth > containerWidth || newHeight > containerHeight) {
            // Calculate the scaling factor to fit the image within the container
            const scaleWidth = containerWidth / newWidth;
            const scaleHeight = containerHeight / newHeight;
      
            // Apply the scaling factor to fit the image within the container
            const scale = Math.min(scaleWidth, scaleHeight);
            modifiedObject.scaleX! *= scale;
            modifiedObject.scaleY! *= scale;
          }
          canvas.setDimensions({
            width: newWidth,
            height: newHeight,
          });
        }
      });
    });
  }, [uploadedImage]);

  const handleToolActions = (action: string) => {
    const canvas = modalCanvasRef.current;
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        switch (action) {
          case 'flip':
            activeObject.flipX = !activeObject.flipX;
            break;
          case 'rotateCCW':
            activeObject.rotate(rotation - 45);
            setRotation((prevState) => prevState - 45);
            break;
          case 'rotateCW':
            activeObject.rotate(rotation + 45);
            setRotation((prevState) => prevState + 45);
            break;
          default:
            const editedImageURL = canvas.toDataURL();
            saveMemeFunc(editedImageURL);
            break;
        }
        canvas.renderAll();
      }
    }
  }

  const toolbarDefaultProps = { size: 18, className: 'hover:text-accent transition-all duration-300 cursor-pointer' }

  const toolbarItems = [
    {
      name: 'Flip',
      component: <LuFlipHorizontal2 onClick={() => handleToolActions('flip')} {...toolbarDefaultProps} />
    },
    {
      name: 'Rotate Counter Clockwise',
      component: <LuRotateCcw onClick={() => handleToolActions('rotateCCW')} {...toolbarDefaultProps} />
    },
    {
      name: 'Rotate Clockwise',
      component: <LuRotateCw onClick={() => handleToolActions('rotateCW')} {...toolbarDefaultProps} />
    },
    {
      name: 'Apply',
      component: <IoCheckmarkDoneCircleOutline onClick={() => handleToolActions('Apply')} {...toolbarDefaultProps} />
    },
  ];

  return (
    <Modal modalTitle='Edit Meme' {...modalProps}>
      <div ref={modalContainerRef} className='w-full h-80 xl:w-[30.625rem] xl:h-[23.125rem] border border-solid border-[#f4f4f4]/40'>
        <canvas id='imgCanvas' className='w-full h-auto'></canvas>
      </div>
      <div className='flex flex-row items-center p-2 gap-2'>
        {toolbarItems && toolbarItems.map((items, i) => (
          <Tooltip
            key={i}
            name={items.name}
            position='top'
            color='black'
            backgroundColor='white'
            textSize='9'
            textBold={true}
            capitalize={true}
          >
            {items.component}
          </Tooltip>
        ))}
      </div>
    </Modal>
  )
}

export default MemeImageEditor