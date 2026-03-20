export type FieldValue = string | number | boolean | Date | null;

export interface FieldStyle {
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  [key: string]: string | undefined;
}

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  email?: boolean;
  url?: boolean;
  custom?: (value: FieldValue) => string | null;
}

export type FormDataRecord = Record<string, FieldValue>;

export interface UploadFile {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  content?: ArrayBuffer | string;
}
