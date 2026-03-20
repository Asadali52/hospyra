import { FieldStyle, SelectOption, FieldValidation, FieldValue } from './common';

export interface FormField {
  id: string;
  name?: string;
  type: string;
  label: string;
  style?: FieldStyle;
  options?: (string | SelectOption)[];
  required?: boolean;
  validation?: FieldValidation;
  placeholder?: string;
  isSystemField?: boolean;
  showOnlyInPreview?: boolean;
  value?: FieldValue;
}

export interface FormHandler {
  id: number;
  partner_id: number;
  service_id: number;
  brand_id: number;
  service_url: string;
  form_data: FormField[];
  created_at: string;
  updated_at: string;
}
