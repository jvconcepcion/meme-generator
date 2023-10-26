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

    const canvasWidth = modalContainerRef.current.clientWidth;
    const canvasHeight = (canvasWidth * 2) / 3; // Maintain 3:2 aspect ratio
    if (!uploadedImage) return;

    const canvas = new fabric.Canvas('imgCanvas', {
      width: canvasWidth,
      height: canvasHeight,
    });
    modalCanvasRef.current = canvas;

    // Load the image onto the canvas
    fabric.Image.fromURL(uploadedImage, (img) => {
      if (canvas && img) {
        // Calculate the scaling factor to fit the image into the canvas
        const scaleFactor = Math.min(canvasWidth / img.width!, canvasHeight / img.height!);

        // Scale the image
        img.scale(scaleFactor);

        // Add the image to the canvas
        canvas.add(img);
        canvas.setActiveObject(img);
      }
    });

    return () => {
      // Clean up the canvas when the modal is closed
      canvas.clear();
    };
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
      <div ref={modalContainerRef} className='default-mobile-width aspect-[3/2]'>
        <canvas id='imgCanvas' className='meme-canvas aspect-[3/2]'></canvas>
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