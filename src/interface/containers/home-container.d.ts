import { TextFieldProps } from '@interface/components/textfield';
import { RgbaColor } from 'react-colorful';

export interface TextEditorProps {
  textfields: TextFieldProps[],
  disabled?: boolean;
  actions?: {
    colorChange: (e: RgbaColor, type: string) => void;
    addTextfieldFunc: () => void;
    removeTextfieldFunc: () => void;
  };
};

export interface ImageEditorProps {
  config: {
    uploadedImage: string | null;
    saveMemeFunc: (newImg: string | null) => void;
    modalProps: {
      isVisible: boolean;
      closeModalFunc: () => void;
    };
  }
};

// export type CustomTextboxProps = fabric.Textbox & { id: string };
