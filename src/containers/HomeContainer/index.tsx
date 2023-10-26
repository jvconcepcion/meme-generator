'use client'

import React, { useState, useRef, useEffect } from 'react';
import Dropzone, { FileRejection } from 'react-dropzone';
import { fabric } from 'fabric';
import { RgbaColor } from 'react-colorful';
import { rgbaToHex } from '@utils/helpers';
import { TextFieldProps } from '@interface/components/textfield';
import MemeImageEditor from '@containers/HomeContainer/MemeImageEditor';
import MemeTextEditor from '@containers/HomeContainer/MemeTextEditor';

const HomeContainer: React.FC = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<fabric.Canvas | null>(null);

  const [image, setImage] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState<{ [key: string]: number }>({
    width: 0,
    height: 0
  });
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
  const { width, height } = canvasSize;

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
    let canvas: fabric.Canvas;
    // Set up the Fabric.js canvas
    if (canvasRef.current) {
      canvas = canvasRef.current;
    } else {
      canvas = new fabric.Canvas('memeCanvas', {
        width: width,
        height: height,
      });

      canvasRef.current = canvas;
    }

    // Ensure the image and canvas are available
    if (!newImg) return;

    // fabric.Image.fromURL(imgElement.src, (img) => {
    fabric.Image.fromURL(newImg, (img) => {
      const canvasScaleFactor = width / (img?.width || 1);

      img.scaleToWidth(width);

      const textObjects: fabric.Textbox[] = [];
      let position: number = textScale.position;

      Object.keys(inputValues).forEach((value, i) => {
        position = i > 0
          ? (i + 4) * textScale.position
          : (i + 1) * textScale.position;

        const textObject = new fabric.Textbox(inputValues[value].toUpperCase(), {
          name: value,
          fontSize: width * 0.05 * canvasScaleFactor,
          top: height * position * canvasScaleFactor,
          width: width * canvasScaleFactor,
          textAlign: 'center',
          fill: '#FFFFFF',
        });

        textObjects.push(textObject);
      });

      setTextScale({ scale: canvasScaleFactor, position })

      // Clear the existing canvas
      canvas.clear()

      // disable selection of the edited image
      img.selectable = false;
      img.evented = false;

      // Add objects to canvas
      canvas.add(img);
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

    let position = 0.2 + textScale.position;
    const newCanvasTextObj = new fabric.Textbox(id.toUpperCase(), {
      name: id,
      fontSize: width * 0.05 * textScale.scale,
      top: height * position * textScale.scale,
      width: width * textScale.scale,
      textAlign: 'center',
      fill: '#FFFFFF',
    });
    canvas.add(newCanvasTextObj);
    canvas.renderAll();

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
    if (!canvasContainerRef.current) return;

    const width = canvasContainerRef.current.clientWidth;
    const height = (width * 2) / 3; // Maintain 3:2 aspect ratio
    setCanvasSize({ width, height });
  }, [canvasContainerRef])

  return (
    <section className='container mx-auto p-3'>
      <div className='flex flex-col gap-2 xl:flex-row xl:h-[25.625rem]'>
        <div className='flex flex-col items-center gap-2'>
          <div ref={canvasContainerRef} className='default-mobile-width aspect-[3/2]'>
            <canvas id='memeCanvas' className='meme-canvas aspect-[3/2]'></canvas>
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