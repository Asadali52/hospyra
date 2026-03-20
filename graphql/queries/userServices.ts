import { gql } from '@apollo/client';

export const GET_USER_SERVICES = gql`
  query GetUserServices($userId: ID!) {
    getUserServices(user_id: $userId) {
      user_service_id
      user_id
      role
      subscription_status
      service {
        service_name
        domain_url
        subdomain
        description
        status
        service_image
        brand_id
        pricing
        duration
        availability_slots
        supplyPartners {
          partner_id
          name
          description
          service_id
          brand_id
          image
          is_active
        }
        category_id
        categoryName
        createdAt
        updatedAt
        subscribedSupplyPartners {
          partner_id
          name
          description
          service_id
          brand_id
          image
          is_active
          createdAt
          updatedAt
          submission_id
          submitted_at
        }
      }
      service_id
    }
  }
`;
