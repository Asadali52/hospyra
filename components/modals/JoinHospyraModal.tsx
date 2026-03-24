'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useFormHandlers } from '@/hooks/useFormHandlers';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { FormField } from '@/types/formHandler';
import { FormDataRecord, FieldValue } from '@/types/common';

const HOSPERRA_PARTNER_ID = 16;

const STEPS = [
  {
    step: 1,
    title: 'Business Information',
    sectionTitle: 'Tell us about your business',
    keywords: [
      'business name',
      'business type',
      'number of locations',
      'primary location',
      'city',
      'state',
      'years in operation',
      'opening soon',
    ],
  },
  {
    step: 2,
    title: 'Contact Details',
    sectionTitle: 'Who should we contact?',
    keywords: [
      'full name',
      'name',
      'role',
      'phone',
      'email',
      'owner',
      'partner',
      'operator',
      'manager',
    ],
  },
  {
    step: 3,
    title: 'Current Operations',
    sectionTitle: 'Help us understand your operations',
    keywords: [
      'revenue',
      'monthly revenue',
      'challenges',
      'food cost',
      'labor',
      'vendor',
      'staffing',
      'marketing',
      'operations',
      'centrally managed',
      'multiple vendors',
    ],
  },
  {
    step: 4,
    title: 'Services Interest',
    sectionTitle: 'What areas do you need support in?',
    keywords: [
      'food',
      'supply',
      'technology',
      'staffing',
      'optimization',
      'marketing',
      'emergency',
      'construction',
      'design',
      'kitchen',
      'equipment',
      'smallware',
      'furniture',
      'fixtures',
      'sound',
      'lighting',
      'entertainment',
      'financing',
      'expansion',
      'services',
    ],
  },
  {
    step: 5,
    title: 'Growth & Goals',
    sectionTitle: 'Where do you want to take your business?',
    keywords: [
      'expand',
      'locations',
      'goal',
      'main goal',
      'planning',
      'growth',
    ],
  },
  {
    step: 6,
    title: 'Final Review',
    sectionTitle: 'Final details before submission',
    keywords: [
      'how soon',
      'start',
      'additional notes',
      'exploring',
      'immediately',
    ],
  },
] as const;

const HIDDEN_INVITE_CODE = 'KAR001';

function isInviteCodeField(field: FormField): boolean {
  const searchText = `${(field.label || '').toLowerCase()} ${(field.name || '').toLowerCase()}`;
  return (
    searchText.includes('invite') ||
    searchText.includes('referral') ||
    (searchText.includes('code') && (searchText.includes('invite') || searchText.includes('referral')))
  );
}

function assignFieldToStep(field: FormField): number {
  const searchText = `${(field.label || '').toLowerCase()} ${(field.name || '').toLowerCase()}`;

  for (let i = 0; i < STEPS.length; i++) {
    const hasMatch = STEPS[i].keywords.some((kw) => searchText.includes(kw));
    if (hasMatch) return STEPS[i].step;
  }

  return 6;
}

interface JoinHospyraModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: {
    email?: string;
    name?: string;
    phone?: string;
    referralCode?: string;
  };
}

const mapUrlParamToFieldName = (fieldName: string): string[] => {
  const nameLower = fieldName.toLowerCase();
  if (nameLower.includes('email')) return ['email'];
  if (nameLower.includes('name') && !nameLower.includes('username')) {
    if (nameLower.includes('first')) return ['firstName', 'first_name'];
    if (nameLower.includes('last')) return ['lastName', 'last_name'];
    if (nameLower.includes('full')) return ['fullName', 'full_name'];
    return ['name'];
  }
  if (nameLower.includes('phone') || nameLower.includes('mobile') || nameLower.includes('tel')) {
    return ['phone', 'phoneNumber', 'phone_number', 'mobile', 'telephone'];
  }
  if (nameLower.includes('invite') || nameLower.includes('referral') || nameLower.includes('code')) {
    return ['inviteCode', 'invite_code', 'referralCode', 'referral_code', 'code'];
  }
  return [];
};

const normalizeFormElements = (elements: FormField[]): FormField[] => {
  return elements.map((element, index) => ({
    id: element.id || `element_${index}`,
    type: element.type || 'text',
    label: element.label || element.name || `Field ${index + 1}`,
    name: element.name,
    placeholder: element.placeholder || '',
    required: element.required || false,
    value: element.value || '',
    options: element.options || [],
    validation: element.validation || {},
    style: element.style || {},
    isSystemField: element.isSystemField || false,
    showOnlyInPreview: element.showOnlyInPreview || false,
  }));
};

export const JoinHospyraModal: React.FC<JoinHospyraModalProps> = ({
  open,
  onOpenChange,
  initialValues = {},
}) => {
  const router = useRouter();
  const { formHandlers, isLoading, error } = useFormHandlers(open ? HOSPERRA_PARTNER_ID : null);
  const { submitAndProcessForm, isSubmitting } = useFormSubmission();
  const [formData, setFormData] = useState<FormDataRecord>({});
  const [parsedFields, setParsedFields] = useState<FormField[]>([]);
  const [fieldsByStep, setFieldsByStep] = useState<Record<number, FormField[]>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!open) {
      setFormData({});
      setParsedFields([]);
      setFieldsByStep({});
      setCurrentStep(1);
      setSubmitError(null);
      setFieldErrors({});
      setShowSuccess(false);
      return;
    }
  }, [open]);

  useEffect(() => {
    setFormData({});
    setParsedFields([]);
    setFieldsByStep({});

    if (formHandlers?.length > 0) {
      const firstHandler = formHandlers[0];
      const formDataRaw = firstHandler.form_data;

      if (Array.isArray(formDataRaw)) {
        const normalizedFields = normalizeFormElements(formDataRaw);
        setParsedFields(normalizedFields);

        const byStep: Record<number, FormField[]> = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
        normalizedFields.forEach((field) => {
          if (isInviteCodeField(field)) return;
          const step = assignFieldToStep(field);
          if (!byStep[step]) byStep[step] = [];
          byStep[step].push(field);
        });

        setFieldsByStep(byStep);

        const initialData: FormDataRecord = {};
        normalizedFields.forEach((field: FormField) => {
          if (isInviteCodeField(field)) {
            initialData[field.id] = HIDDEN_INVITE_CODE;
            return;
          }
          initialData[field.id] = field.value || '';
          if (initialValues) {
            const fieldName = field.name || field.label || '';
            const mapped = mapUrlParamToFieldName(fieldName);
            if (mapped.includes('email') && initialValues.email) {
              initialData[field.id] = initialValues.email;
            } else if (
              mapped.some((n) => ['name', 'fullName', 'full_name'].includes(n)) &&
              initialValues.name
            ) {
              initialData[field.id] = initialValues.name;
            } else if (
              mapped.some((n) => ['phone', 'phoneNumber', 'phone_number', 'mobile'].includes(n)) &&
              initialValues.phone
            ) {
              initialData[field.id] = initialValues.phone;
            }
          }
        });
        setFormData(initialData);
      }
    }
  }, [formHandlers, initialValues]);

  const handleInputChange = (fieldId: string, value: FieldValue) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    setSubmitError(null);
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  };

  const handleMultiSelectChange = (fieldId: string, optionValue: string, checked: boolean) => {
    const current = formData[fieldId];
    const arr = typeof current === 'string' && current
      ? current.split(',').map((s) => s.trim()).filter(Boolean)
      : [];
    const next = checked
      ? [...arr, optionValue]
      : arr.filter((v) => v !== optionValue);
    setFormData((prev) => ({ ...prev, [fieldId]: next.join(',') }));
    setFieldErrors((prev) => {
      const copy = { ...prev };
      delete copy[fieldId];
      return copy;
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!isLastStep) return;
    setSubmitError(null);

    const errors: Record<string, string> = {};
    currentFields.forEach((field) => {
      const err = getFieldError(field);
      if (err) errors[field.id] = err;
    });
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (!formHandlers?.length) return;

    try {
      const formHandler = formHandlers[0];
      const submitData: FormDataRecord = { ...formData };
      parsedFields.forEach((f) => {
        if (isInviteCodeField(f)) submitData[f.id] = HIDDEN_INVITE_CODE;
      });
      await submitAndProcessForm({
        formId: formHandler.id,
        brandId: formHandler.brand_id || 1,
        data: submitData,
        file: null,
      });
      setShowSuccess(true);
    } catch {
      setSubmitError('Error submitting form. Please try again.');
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onOpenChange(false);
    router.push('/contact');
  };

  const stepsWithFields = [1, 2, 3, 4, 5, 6].filter((s) => (fieldsByStep[s]?.length ?? 0) > 0);
  const currentFields = fieldsByStep[currentStep] ?? [];
  const lastStepWithFields = stepsWithFields.length ? Math.max(...stepsWithFields) : 6;
  const isLastStep = currentStep >= lastStepWithFields || currentStep === 6;
  const isFirstStep = currentStep <= 1;

  const getFieldError = (field: FormField): string | null => {
    if (!field.required) return null;
    const val = formData[field.id];
    if (val === undefined || val === null) return `${field.label || 'This field'} is required`;
    const str = typeof val === 'string' ? val.trim() : String(val);
    if (str === '' || str === 'false') return `${field.label || 'This field'} is required`;
    if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)) {
      return 'Please enter a valid email address';
    }
    return null;
  };

  const goNext = () => {
    const errors: Record<string, string> = {};
    let hasError = false;
    currentFields.forEach((field) => {
      const err = getFieldError(field);
      if (err) {
        errors[field.id] = err;
        hasError = true;
      }
    });
    setFieldErrors(errors);
    if (hasError) {
      setSubmitError(null);
      return;
    }
    setFieldErrors({});
    setSubmitError(null);
    for (let s = currentStep + 1; s <= 6; s++) {
      if ((fieldsByStep[s]?.length ?? 0) > 0) {
        setCurrentStep(s);
        return;
      }
    }
    setCurrentStep(Math.min(6, currentStep + 1));
  };

  const goBack = () => {
    for (let s = currentStep - 1; s >= 1; s--) {
      if ((fieldsByStep[s]?.length ?? 0) > 0) {
        setCurrentStep(s);
        return;
      }
    }
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  const renderField = (field: FormField) => {
    const fieldId = field.id;
    const rawValue = formData[fieldId];
    const fieldValue =
      rawValue === null || rawValue === undefined
        ? ''
        : typeof rawValue === 'boolean'
          ? rawValue.toString()
          : rawValue instanceof Date
            ? rawValue.toISOString().split('T')[0]
            : Array.isArray(rawValue)
              ? rawValue
              : String(rawValue);
    const fieldLabel = field.label;
    const fieldPlaceholder = field.placeholder || '';
    const fieldType = field.type || 'text';
    const isChecked = rawValue === true || fieldValue === 'true';
    const isMultiSelect = fieldType === 'multiselect' || (field.options?.length && field.options.length > 3 && field.label?.toLowerCase().includes('challenge'));
    const selectedArr = typeof fieldValue === 'string' && fieldValue
      ? fieldValue.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const fieldError = fieldErrors[fieldId];
    const inputClass = `w-full px-3 py-2 border rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1E50C1] focus:border-transparent ${
      fieldError ? 'border-red-500' : 'border-gray-300'
    }`;
    const labelClass = 'block text-sm font-medium text-gray-700 mb-1 font-effra';

    if (isMultiSelect || (field.label?.toLowerCase().includes('service') && field.options?.length)) {
      return (
        <div key={field.id} className="mb-4">
          <label className={labelClass}>
            {fieldLabel} {field.required && <span className="text-red-500">*</span>}
          </label>
          <div className="space-y-2">
            {field.options?.map((option, index) => {
              const optVal = typeof option === 'string' ? option : String(option.value ?? '');
              const optLabel = typeof option === 'string' ? option : String(option.label ?? optVal);
              const checked = selectedArr.includes(optVal);
              return (
                <label key={index} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => handleMultiSelectChange(fieldId, optVal, e.target.checked)}
                    className="h-4 w-4 text-[#1E50C1] focus:ring-[#1E50C1] border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700 font-effra">{optLabel}</span>
                </label>
              );
            })}
          </div>
          {fieldError && (
            <p className="mt-1 text-xs text-red-600 font-effra">{fieldError}</p>
          )}
        </div>
      );
    }

    switch (fieldType) {
      case 'text':
      case 'email':
      case 'password':
      case 'tel':
      case 'url':
        return (
          <div key={field.id} className="mb-4">
            <label className={labelClass}>
              {fieldLabel} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={fieldType}
              value={Array.isArray(fieldValue) ? '' : fieldValue}
              onChange={(e) => handleInputChange(fieldId, e.target.value)}
              placeholder={fieldPlaceholder}
              required={field.required}
              className={inputClass}
            />
            {fieldError && (
              <p className="mt-1 text-xs text-red-600 font-effra">{fieldError}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="mb-4">
            <label className={labelClass}>
              {fieldLabel} {field.required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              value={Array.isArray(fieldValue) ? '' : fieldValue}
              onChange={(e) => handleInputChange(fieldId, e.target.value)}
              placeholder={fieldPlaceholder}
              required={field.required}
              rows={4}
              className={inputClass}
            />
            {fieldError && (
              <p className="mt-1 text-xs text-red-600 font-effra">{fieldError}</p>
            )}
          </div>
        );

      case 'select':
      case 'dropdown':
        return (
          <div key={field.id} className="mb-4">
            <label className={labelClass}>
              {fieldLabel} {field.required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={Array.isArray(fieldValue) ? '' : fieldValue}
              onChange={(e) => handleInputChange(fieldId, e.target.value)}
              required={field.required}
              className={inputClass}
            >
              <option value="">Select {fieldLabel}</option>
              {field.options?.map((option, index) => {
                const optVal = typeof option === 'string' ? option : String(option.value ?? '');
                const optLabel = typeof option === 'string' ? option : String(option.label ?? optVal);
                return (
                  <option key={index} value={optVal}>
                    {optLabel}
                  </option>
                );
              })}
            </select>
            {fieldError && (
              <p className="mt-1 text-xs text-red-600 font-effra">{fieldError}</p>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => handleInputChange(fieldId, e.target.checked)}
                className="h-4 w-4 text-[#1E50C1] focus:ring-[#1E50C1] border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 font-effra">
                {fieldLabel} {field.required && <span className="text-red-500">*</span>}
              </span>
            </label>
            {fieldError && (
              <p className="mt-1 text-xs text-red-600 font-effra">{fieldError}</p>
            )}
          </div>
        );

      case 'radio':
        return (
          <div key={field.id} className="mb-4">
            <label className={labelClass}>
              {fieldLabel} {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="space-y-2">
              {field.options?.map((option, index) => {
                const optVal = typeof option === 'string' ? option : String(option.value ?? '');
                const optLabel = typeof option === 'string' ? option : String(option.label ?? optVal);
                return (
                  <label key={index} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={fieldId}
                      value={optVal}
                      checked={fieldValue === optVal}
                      onChange={(e) => handleInputChange(fieldId, e.target.value)}
                      className="h-4 w-4 text-[#1E50C1] focus:ring-[#1E50C1] border-gray-300"
                    />
                    <span className="text-sm text-gray-700 font-effra">{optLabel}</span>
                  </label>
                );
              })}
            </div>
            {fieldError && (
              <p className="mt-1 text-xs text-red-600 font-effra">{fieldError}</p>
            )}
          </div>
        );

      default:
        return (
          <div key={field.id} className="mb-4">
            <label className={labelClass}>
              {fieldLabel} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={Array.isArray(fieldValue) ? '' : fieldValue}
              onChange={(e) => handleInputChange(fieldId, e.target.value)}
              placeholder={fieldPlaceholder}
              required={field.required}
              className={inputClass}
            />
            {fieldError && (
              <p className="mt-1 text-xs text-red-600 font-effra">{fieldError}</p>
            )}
          </div>
        );
    }
  };

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={() => handleSuccessClose()}>
        <DialogContent onClose={handleSuccessClose} className="max-w-md mx-auto text-center">
          <div className="py-6">
            <h2 className="text-xl font-bold text-gray-900 font-effra mb-3">
              Application Received
            </h2>
            <p className="text-gray-600 font-effra text-sm leading-relaxed mb-6">
              Thank you for applying to Hosperra. Our team will review your business and reach out
              shortly to discuss next steps.
            </p>
            <button
              type="button"
              onClick={handleSuccessClose}
              className="w-full py-3 px-4 rounded-lg font-medium font-effra bg-[#1E50C1] text-white hover:bg-[#1a45a8] transition-colors"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onClose={() => onOpenChange(false)} className="max-w-md mx-auto">
        <h2 className="text-xl font-bold text-gray-900 font-effra mb-1">
          Join Hosperra
        </h2>

        {/* Stepper */}
        <div className="flex items-center justify-between gap-1 my-4">
          {[1, 2, 3, 4, 5, 6].map((step) => {
            const hasFields = (fieldsByStep[step]?.length ?? 0) > 0;
            const isActive = step === currentStep;
            const isComplete = step < currentStep;
            if (!hasFields) return null;
            return (
              <div
                key={step}
                className={`flex-1 h-1.5 rounded-full transition-colors ${
                  isActive ? 'bg-[#1E50C1]' : isComplete ? 'bg-[#1E50C1]/60' : 'bg-gray-200'
                }`}
                title={`Step ${step}`}
              />
            );
          })}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#1E50C1] border-t-transparent" />
            <span className="ml-3 text-gray-600 font-effra">Loading form...</span>
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg font-effra text-sm">
            {error}
          </div>
        )}

        {!isLoading && !error && parsedFields.length > 0 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isLastStep) handleSubmit(e);
            }}
            className="space-y-2"
          >
            {currentFields.length > 0 ? (
              <>
                <div className="mb-2">
                  <p className="text-xs font-semibold text-[#1E50C1] uppercase tracking-wider font-effra">
                    Step {currentStep} of 6
                  </p>
                  <h3 className="text-base font-bold text-gray-900 font-effra">
                    {STEPS[currentStep - 1]?.sectionTitle ?? STEPS[currentStep - 1]?.title}
                  </h3>
                </div>

                {currentFields.map((field) => renderField(field))}

                {submitError && (
                  <p className="text-sm text-red-600 font-effra">{submitError}</p>
                )}

                <div className="flex gap-3 pt-4">
                  {!isFirstStep && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="flex items-center justify-center gap-1 py-3 px-4 rounded-lg font-medium font-effra border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Back
                    </button>
                  )}
                  {!isLastStep ? (
                    <button
                      type="button"
                      onClick={goNext}
                      className="flex-1 flex items-center justify-center gap-1 py-3 px-4 rounded-lg font-medium font-effra bg-[#1E50C1] text-white hover:bg-[#1a45a8] transition-colors"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSubmit()}
                      disabled={isSubmitting}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium font-effra transition-colors ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : 'bg-[#1E50C1] text-white hover:bg-[#1a45a8]'
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  )}
                </div>

                {isLastStep && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-1">
                    <p className="text-xs text-gray-500 font-effra">
                      • No upfront signup fee (limited time)
                    </p>
                    <p className="text-xs text-gray-500 font-effra">
                      • Applications are reviewed before approval
                    </p>
                    <p className="text-xs text-gray-500 font-effra">
                      • Our team will contact you after review
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="py-8 text-center text-gray-500 font-effra text-sm">
                No fields in this step. Use Next to continue.
              </div>
            )}
          </form>
        )}

        {!isLoading && !error && formHandlers?.length > 0 && parsedFields.length === 0 && (
          <p className="text-gray-500 font-effra text-sm">
            No form fields available. Please try again later.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};
