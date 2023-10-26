import { ButtonProps } from './button';

export interface ButtonGroupProps {
  schema?: (ButtonProps & {
    name: string;
    toolTipPosition?: string;
    component?: React.ReactNode | React.JSXElement;
  })[];
}