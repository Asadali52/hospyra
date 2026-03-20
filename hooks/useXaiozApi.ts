'use client';

import { apolloClient } from '@/lib/apolloClient';
import { GET_SUPPLY_PARTNER_BY_DOMAIN } from '@/graphql/queries/supplyPartner';
import { GET_FORM_HANDLERS_BY_PARTNER_ID } from '@/graphql/queries/formHandler';
import { SUBMIT_FORM, PROCESS_SUBMISSION } from '@/graphql/mutations/formSubmission';
import { USER_SIGN_IN } from '@/graphql/mutations/userSignIn';
import { GET_SUBSCRIPTION_PLANS } from '@/graphql/queries/subscriptionPlan';
import { CREATE_SUBSCRIPTION } from '@/graphql/mutations/subscription';

/**
 * Xaioz API hooks for Hospyra
 * Use these to interact with the Xaioz GraphQL API (https://xaioz.com/graphql)
 */

/** Fetch supply partner by domain (e.g. "hospyra.com") */
export async function fetchSupplyPartnerByDomain(domainUrl: string) {
  const response = await apolloClient.query({
    query: GET_SUPPLY_PARTNER_BY_DOMAIN,
    variables: { domainUrl },
  });
  return response.data;
}

/** Fetch form handlers for a partner */
export async function fetchFormHandlersByPartnerId(partnerId: number) {
  const response = await apolloClient.query({
    query: GET_FORM_HANDLERS_BY_PARTNER_ID,
    variables: { partnerId },
  });
  return response.data;
}

/** Submit a form */
export async function submitForm(variables: {
  formId: number;
  brandId: number;
  data: Record<string, unknown>;
  file?: File;
}) {
  const result = await apolloClient.mutate({
    mutation: SUBMIT_FORM,
    variables,
  });
  return result.data;
}

/** Process a submission */
export async function processSubmission(submissionId: number, brandId: number) {
  const result = await apolloClient.mutate({
    mutation: PROCESS_SUBMISSION,
    variables: { submissionId, brandId },
  });
  return result.data;
}

/** User sign in */
export async function userSignIn(userEmail: string, userPassword: string) {
  const result = await apolloClient.mutate({
    mutation: USER_SIGN_IN,
    variables: { userEmail, userPassword },
  });
  return result.data;
}

/** Fetch subscription plans */
export async function fetchSubscriptionPlans(variables?: {
  countryid?: number;
  global?: boolean;
  isambassador?: boolean;
}) {
  const response = await apolloClient.query({
    query: GET_SUBSCRIPTION_PLANS,
    variables: variables ?? {},
  });
  return response.data;
}

/** Create a subscription */
export async function createSubscription(userId: number, planId: number) {
  const result = await apolloClient.mutate({
    mutation: CREATE_SUBSCRIPTION,
    variables: { userId, planId },
  });
  return result.data;
}
