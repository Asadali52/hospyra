import { gql } from '@apollo/client';

export const GET_SUPPLY_PARTNER_BY_DOMAIN = gql`
  query GetSupplyPartnerByDomain($domainUrl: String!) {
    getSupplyPartnerByDomain(domain_url: $domainUrl) {
      partner_id
      name
      description
      service {
        service_name
        domain_url
        description
        service_image
        pricing
        duration
        availability_slots
        category_id
        categoryName
        createdAt
        updatedAt
      }
      brand_id
      brand {
        id
        name
        description
        image
        category_id
        domain_url
        status
      }
      image
      is_active
      createdAt
      updatedAt
      created_at
      updated_at
      service_id
    }
  }
`;
