export interface TextFieldProps {
  id: string;
  labelName: string;
  value: string | undefined;
  withLabel?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};