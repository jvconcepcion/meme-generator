export interface ColorPickerProps {
  label?: string;
  value?: string;
  buttonPicker?: React.JSXElement;
  buttonColor?: string;
  tooltipPosition?: string;
  onClick?: (e: RgbaColor) => void;
};