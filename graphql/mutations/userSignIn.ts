import { gql } from '@apollo/client';

export const USER_SIGN_IN = gql`
  mutation UserSignIn($userEmail: String!, $userPassword: String!) {
    userSignIn(user_email: $userEmail, user_password: $userPassword) {
      user_details {
        user_id
        email
        phone
        user_type
        user_type_string
        user_account_status
        is_ambassador
        stripe_user_id
        country_id
        city_id
        state
        postcode
        timezone
        createdAt
        updatedAt
        user_first_name
        user_last_name
        user_address
        profile_picture
        available_for_trip
        bio
        token
        user_referral_code
        user_referred_by
        user_services {
          user_service_id
          user_id
          service_id
          role
          subscription_status
          created_at
          updated_at
        }
        sso_token
        brand_access {
          service_id
          brand_id
          domain_url
          role
          service_name
          login_url
        }
      }
    }
  }
`;
