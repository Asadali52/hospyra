'use client';

import { useState, useEffect } from 'react';
import { apolloClient } from '@/lib/apolloClient';
import { GET_FORM_HANDLERS_BY_PARTNER_ID } from '@/graphql/queries/formHandler';
import { FormHandler } from '@/types/formHandler';

export const useFormHandlers = (partnerId: number | null) => {
  const [formHandlers, setFormHandlers] = useState<FormHandler[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFormHandlers = async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apolloClient.query({
        query: GET_FORM_HANDLERS_BY_PARTNER_ID,
        variables: { partnerId: id },
      });

      if (response.data?.getFormHandlersByPartnerId) {
        setFormHandlers(response.data.getFormHandlersByPartnerId);
      }
    } catch (err) {
      console.error('fetchFormHandlers error:', err);
      setError('Could not load form.');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (partnerId) {
      fetchFormHandlers(partnerId);
    }
  }, [partnerId]);

  return {
    formHandlers,
    isLoading,
    error,
    refetch: fetchFormHandlers,
  };
};
