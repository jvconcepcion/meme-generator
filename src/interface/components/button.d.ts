export interface ButtonProps {
  buttonColor?: string;
  disable?: boolean;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent) => void;
  children?: React.ReactNode | React.JSXElement;
};