'use client'

import React, { useState, useRef, useEffect } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import { fabric } from 'fabric';
import { RgbaColor } from 'react-colorful';
import { rgbaToHex } from '@utils/helpers';
import { TextFieldProps } from '@interface/components/textfield';
import MemeImageEditor from '@containers/HomeContainer/MemeImageEditor';
import MemeTextEditor from '@containers/HomeContainer/MemeTextEditor';
import { ICustomTextboxOptions } from '@interface/containers/home-container';

const HomeContainer: React.FC = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const [image, setImage] = useState<string | null>(null);
  const [textScale, setTextScale] = useState<{ [key: string]: number }>({
    scale: 0,
    position: 0.05
  })
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    first: 'First Text',
    second: 'Second Text',
  });
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [textfields, setTextfields] = useState<TextFieldProps[]>([
    {
      id: 'first',
      labelName: 'First Text',
      value: inputValues['first'] || '',
      onChange: (e) => handleInputChange(e, 'first'),
    },
    {
      id: 'second',
      labelName: 'Second Text',
      value: inputValues['second'] || '',
      onChange: (e) => handleInputChange(e, 'second'),
    }
  ])

  const handleDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setImage(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result && typeof reader.result === 'string') {
        setImage(reader.result);
        setTextScale({ scale: 0, position: 0.05 });
        setInputValues({ first: 'First Text', second: 'Second Text', });
      };
    };
    reader.readAsDataURL(acceptedFiles[0]);
    setToggleModal(true);
  };

  const handleSaveMeme = (newImg: string | null) => {
    if (!newImg) return;
    if (!canvasContainerRef.current) return;
    const containerStyle = canvasContainerRef.current.style;

    fabric.Image.fromURL(newImg, (img) => {
      let canvas: fabric.Canvas;
      const uploadedWidth = Math.min(490, img.width!);
      const uploadedHeight = Math.max(370, (img.width! / img.width!) * img.height!);

      containerStyle.height = uploadedHeight + 'px';

      // Set up the Fabric.js canvas
      if (canvasRef.current) {
        canvas = canvasRef.current;
        canvas.setDimensions({
          width: uploadedWidth,
          height: uploadedHeight,
        });
      } else {
        canvas = new fabric.Canvas('memeCanvas', {
          width: uploadedWidth,
          height: uploadedHeight,
        });

        canvasRef.current = canvas;
      }

      const scaleFactor = 490 / uploadedWidth;
      // img.scale(scaleFactor);

      // disable selection of the edited image
      img.selectable = false;
      img.evented = false;

      // Add objects to canvas
      canvas.clear().add(img);
      const textObjects: fabric.Textbox[] = [];
      let position: number = textScale.position;

      Object.keys(inputValues).forEach((value, i) => {
        position = i > 0
          ? (i + 2) * textScale.position
          : (i + 1) * textScale.position;

        // Calculate the font size based on the canvas size
        const fontSize = Math.min(uploadedWidth, uploadedHeight) * 0.04 * scaleFactor;

        // Calculate the vertical position based on the canvas size and textScale.position
        const verticalPosition = uploadedHeight * position * scaleFactor;

        const textObject = new fabric.Textbox(inputValues[value].toUpperCase(), {
          name: value,
          fontSize,
          top: verticalPosition,
          width: uploadedWidth,
          textAlign: 'center',
          fill: '#FFFFFF',
          clipTo: (ctx) => {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.rect(0, 0, uploadedWidth, uploadedHeight); // Clip to the image boundaries
            ctx.restore();
          },
        } as ICustomTextboxOptions);

        textObjects.push(textObject);
      });

      setTextScale({ scale: scaleFactor, position })
      textObjects.forEach((textObject) => {
        canvas.add(textObject);
      });
      canvas.renderAll();
    });

    setToggleModal(false);
  };

  const handleColorChange = (color: RgbaColor, type: string) => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach((obj) => {
        if (type === 'font') {
          (obj as fabric.Textbox).set({ fill: rgbaToHex(color) });
        } else {
          (obj as fabric.Textbox).set({ stroke: rgbaToHex(color) });
        }
      });
    }
    canvas.renderAll()
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const canvas = canvasRef.current;
    setInputValues((prevValues) => ({
      ...prevValues,
      [id]: e.target.value,
    }));

    if (!canvas) return;

    const getObjects = canvas.getObjects();
    console.log(getObjects)
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length > 0) {
      activeObjects.forEach((obj, i) => {
        if (obj.name === id) {
          // This object is an editable text
          (obj as fabric.Textbox).set('text', e.target.value);
        }
      });
    } else {
      getObjects.forEach((obj, i) => {
        if (obj.type === 'textbox' && obj.name === id) {
          // This object is an editable text
          (obj as fabric.Textbox).set('text', e.target.value);
        }
      });
    }
    canvas.renderAll();
  };

  const handleAddTextfield = () => {
    const canvas = canvasRef.current;
    const numTextfields = Object.keys(inputValues).length + 1;

    if (!canvas) return;

    let id: string = '';
    switch (numTextfields) {
      case 1:
        id = 'first';
        break;
      case 2:
        id = 'second';
        break;
      case 3:
        id = 'third';
        break;
      case 4:
        id = 'fourth';
        break;
      default:
        break;
    };

    const newTextfield: TextFieldProps = {
      id,
      labelName: `${id} Text`,
      value: inputValues[id] || '',
      onChange: (e) => handleInputChange(e, id),
    };

    if (!image) return;

    let position = 0.1 + textScale.position;
    fabric.Image.fromURL(image, (img) => {

      const width = canvas.width!;
      const height = canvas.height!;
      const scaleFactor = 490 / width;
      // Calculate the font size based on the canvas size
      const fontSize = Math.min(width, height) * 0.04 * scaleFactor;

      // Calculate the vertical position based on the canvas size and textScale.position
      const verticalPosition = height * position * scaleFactor;

      const newCanvasTextObj = new fabric.Textbox(id.toUpperCase(), {
        name: id,
        fontSize,
        top: verticalPosition,
        width,
        textAlign: 'center',
        fill: '#FFFFFF',
        clipTo: (ctx) => {
          ctx.save();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.rect(0, 0, width, height); // Clip to the image boundaries
          ctx.restore();
        },
      } as ICustomTextboxOptions);
      canvas.add(newCanvasTextObj);
      canvas.renderAll();
    });
    setTextScale((prevState) => ({ ...prevState, position }))
    setInputValues((prevValues) => ({ ...prevValues, [id]: '' }));
    setTextfields([...textfields, newTextfield]);
  };

  const handleRemoveTextfield = () => {
    const canvas = canvasRef.current;

    const updatedTextfields = textfields.slice(0, -1);
    const removedField = textfields[textfields.length - 1].id;
    const { [removedField]: removedValue, ...updatedInputValues } = inputValues;

    if (!canvas) return;

    const textboxToRemove = canvas.getObjects()
      .reverse()
      .find((obj) => {
        return obj.type === 'textbox';
      });

    if (textboxToRemove) {
      // Remove the textbox from the canvas
      canvas.remove(textboxToRemove);
      canvas.renderAll();

      // Update the state with the new textfields and input values
      setTextScale((prevState) => ({ ...prevState, position: prevState.position - 0.2 }))
      setInputValues(updatedInputValues);
      setTextfields(updatedTextfields);
    }
  };

  const imageEditorConfig = {
    uploadedImage: image,
    saveMemeFunc: handleSaveMeme,
    modalProps: {
      isVisible: toggleModal,
      closeModalFunc: () => setToggleModal(false),
    }
  };

  const textEditorConfig = {
    colorChange: handleColorChange,
    addTextfieldFunc: handleAddTextfield,
    removeTextfieldFunc: handleRemoveTextfield,
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    console.log('canvas activated ')
    const canvas = canvasRef.current;

    // Add event listener for object moving
    canvas.on('object:moving', (options) => {
      console.log("moving")
      const modifiedObject = options.target as fabric.Textbox;

      // Get the canvas boundaries
      const canvasWidth = canvas.width!;
      const canvasHeight = canvas.height!;

      // Check if the modified object is a text object
      if (modifiedObject.type === 'textbox') {
        // Calculate the boundaries for the text object
        const textObjectLeft = modifiedObject.left!;
        const textObjectTop = modifiedObject.top!;
        const textObjectWidth = modifiedObject.getScaledWidth();
        const textObjectHeight = modifiedObject.getScaledHeight();

        // Adjust the position to keep the text within the canvas
        const adjustedLeft = Math.max(0, Math.min(canvasWidth - textObjectWidth, textObjectLeft));
        const adjustedTop = Math.max(0, Math.min(canvasHeight - textObjectHeight, textObjectTop));

        // Set the adjusted position
        modifiedObject.set({
          left: adjustedLeft,
          top: adjustedTop,
        });

        // Update the canvas
        canvas.renderAll();
      }
    });

    // Clean up the event listener when the component unmounts
    return () => {
      canvas.off('object:moving');
    };
  }, [canvasRef.current])

  return (
    <section className='container mx-auto p-3'>
      {/* <div className='flex flex-col gap-2 xl:flex-row xl:h-[25.625rem]'> */}
      <div className='flex flex-col gap-2 xl:flex-row'>
        {/* <div className='flex flex-col gap-2 xl:flex-row'> */}
        <div className='flex flex-col'>
          <div ref={canvasContainerRef} className='w-full h-80 xl:w-[30.625rem] xl:h-[23.125rem]'>
            <canvas id='memeCanvas' className='meme-canvas w-full h-full'></canvas>
          </div>
          <div className='actions-container'>
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className='dropzone'>
                  <input {...getInputProps()} />
                  <p>Drag & drop an image here, or click to select one</p>
                </div>
              )}
            </Dropzone>
          </div>
        </div>
        <MemeTextEditor
          textfields={textfields}
          disabled={!image}
          actions={textEditorConfig}
        />
      </div>

      {toggleModal && (
        <MemeImageEditor config={imageEditorConfig} />
      )}
    </section>
  );
};

export default HomeContainer;