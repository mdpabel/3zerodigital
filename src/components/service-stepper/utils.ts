// utils.ts
import { CustomField, ServiceFormData } from './types';

export const getCustomFieldsData = (
  formData: ServiceFormData,
  customFields: CustomField[],
): Record<string, any> => {
  const customFieldsData: Record<string, any> = {};

  customFields.forEach((field) => {
    const value = formData[field.id];
    if (value !== undefined && value !== null && value !== '') {
      customFieldsData[field.id] = {
        label: field.label,
        value: value,
        type: field.type,
      };
    }
  });

  return customFieldsData;
};
