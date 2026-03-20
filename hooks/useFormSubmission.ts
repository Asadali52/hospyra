'use client';

import { useState } from 'react';
import { apolloClient } from '@/lib/apolloClient';
import { SUBMIT_FORM, PROCESS_SUBMISSION } from '@/graphql/mutations/formSubmission';
import { FormDataRecord, UploadFile } from '@/types/common';

interface SubmitFormParams {
  formId: number;
  brandId: number;
  data: FormDataRecord;
  file?: UploadFile | null;
}

interface ProcessSubmissionParams {
  submissionId: number;
  brandId: number;
}

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (params: SubmitFormParams) => {
    const result = await apolloClient.mutate({
      mutation: SUBMIT_FORM,
      variables: {
        formId: params.formId,
        brandId: params.brandId,
        data: params.data,
        file: params.file || null,
      },
    });
    return result.data?.submitForm;
  };

  const processSubmission = async (params: ProcessSubmissionParams) => {
    const result = await apolloClient.mutate({
      mutation: PROCESS_SUBMISSION,
      variables: {
        submissionId: params.submissionId,
        brandId: params.brandId,
      },
    });
    return result.data?.processSubmission;
  };

  const submitAndProcessForm = async (params: SubmitFormParams) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const submitResult = await submitForm(params);

      if (submitResult?.id) {
        const submissionId = submitResult.id;
        const submissionBrandId = submitResult.brand_id;

        if (submitResult.stripe_client_secret) {
          localStorage.setItem('clientSecret', submitResult.stripe_client_secret);
        }
        if (submitResult.user_id) {
          localStorage.setItem('userId', submitResult.user_id.toString());
        }

        try {
          const processResult = await processSubmission({
            submissionId,
            brandId: submissionBrandId,
          });

          if (processResult?.stripe_client_secret) {
            localStorage.setItem('clientSecret', processResult.stripe_client_secret);
          }
          if (processResult?.user_id) {
            localStorage.setItem('userId', processResult.user_id.toString());
          }

          return { submitResult, processResult };
        } catch {
          return { submitResult, processResult: null };
        }
      } else {
        throw new Error('Form submission failed');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error submitting form';
      setError(errorMessage);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitAndProcessForm,
    isSubmitting,
    error,
  };
};
