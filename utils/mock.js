import { faker } from '@faker-js/faker'
import { shuffle } from './functions'

export const MOCK_BANK_ACCOUNTS = [...new Array(5)].map(() => ({
  id: '497f6eca-6276-4993-bfeb-53cbbbba6f08',
  type: faker.finance.accountName(),
  iban: faker.finance.iban(),
  account_number: faker.finance.iban(),
  sort_code: faker.random.alphaNumeric(8).toUpperCase(),
  swift_bic: faker.finance.bic(),
  currency: 'GBP',
  display_name: faker.name.findName(),
  account_provider_id: faker.database.mongodbObjectId().toUpperCase(),
  account_provider_name: 'Truelayer',
  account_provider_country: 'United Kingdom',
  account_provider_logo_url: faker.image.imageUrl(),
}))

export const MOCK_PAYMENT = [...new Array(50)].map(() => ({
  id: faker.datatype.uuid(),
  amount: faker.finance.amount(),
  currency: 'GBP',
  company: {
    id: faker.datatype.uuid(),
    href: faker.internet.url(),
    trading_name: faker.company.companyName(),
    registered_name: faker.company.companyName(),
    registration_number: faker.finance.iban(),
    bank_accounts: [],
  },
  due_date: faker.date.future().toISOString(),
  iban: faker.finance.iban(),
  status: shuffle(['pending', 'failed', 'aborted', 'success'])[0],
}))

export const MOCK_MANDATE = [...new Array(50)].map(() => ({
  account: {
    id: faker.datatype.uuid(),
    type: faker.finance.accountName(),
    iban: faker.finance.iban(),
    account_number: faker.finance.iban(),
    sort_code: faker.random.alphaNumeric(8).toUpperCase(),
    swift_bic: faker.finance.bic(),
    currency: 'GBP',
    display_name: faker.name.findName(),
    account_provider_id: faker.database.mongodbObjectId().toUpperCase(),
    account_provider_name: 'Truelayer',
    account_provider_country: 'United Kingdom',
    account_provider_logo_url: faker.image.imageUrl(),
  },
  company: {
    id: faker.datatype.uuid(),
    href: faker.internet.url(),
    trading_name: faker.company.companyName(),
    registered_name: faker.company.companyName(),
    registration_number: faker.finance.iban(),
    bank_accounts: [],
  },
  valid_from: faker.date.recent().toISOString(),
  valid_to: faker.date.future().toISOString(),
  currency: 'GBP',
  maximum_individual_amount: faker.finance.amount(5000, 100000),
  maximum_periodic_amount: faker.finance.amount(500, 5000),
  periodic_alignment_type: shuffle(['Consent', 'Calendar'])[0],
  periodic_limit_type: shuffle([
    'Day',
    'Week',
    'Month',
    'Fortnight',
    'Half Year',
    'Year',
  ])[0],
}))

export const MOCK_KYC_RESPONSE = {
  id: '497f6eca-6276-4993-bfeb-53cbbbba6f08',
  registered_name: 'string',
  trading_name: 'string',
  credit_safe_check: {
    id: 'string',
    name: 'string',
    registration_number: 'string',
    negative_commentaries_check: {
      check_failed: true,
      negative_commentaries: ['string'],
      check_failure_reason: 'string',
    },
    credit_limit_decreased_check: {
      check_failed: true,
      previous_limit: 0,
      current_limit: 0,
      check_failure_reason: 'string',
    },
    credit_rating_decreased_check: {
      check_failed: true,
      previous_limit: 0,
      current_limit: 0,
      check_failure_reason: 'string',
    },
    company_age_check: {
      check_failed: true,
      registration_date: '2019-08-24T14:15:22Z',
      check_failure_reason: 'string',
    },
    disqualified_directors_check: {
      check_failed: true,
      directors: [
        {
          id: 'string',
          id_type: 'string',
          name: 'string',
          title: 'string',
          first_names: 'string',
          first_name: 'string',
          middle_name: 'string',
          surname: 'string',
          address: {
            type: 'string',
            simple_value: 'string',
            street: 'string',
            house_number: 'string',
            city: 'string',
            postal_code: 'string',
            province: 'string',
            telephone: 'string',
            direct_marketing_opt_out: true,
            direct_marketing_opt_in: true,
            country: 'string',
          },
          gender: 'string',
          birth_name: 'string',
          date_of_birth: '2019-08-24T14:15:22Z',
          place_of_birth: 'string',
          nationality: 'string',
          country_of_residence: 'string',
          country: 'string',
          director_type: 'string',
          has_negative_info: true,
          signing_authority: true,
          additional_data: {
            disqualified: true,
          },
          positions: [
            {
              date_appointed: '2019-08-24T14:15:22Z',
              common_code: 'string',
              provider_code: 'string',
              position_name: 'string',
              authority: 'string',
              appt_duration_type: 'string',
              resignation_date: '2019-08-24T14:15:22Z',
              additional_data: null,
            },
          ],
        },
      ],
      check_failure_reason: 'string',
    },
    contingent_liabilities_check: {
      check_failed: true,
      number_of_contingent_liabilities: 0,
      check_failure_reason: 'string',
    },
    high_debt_ratio_check: {
      check_failed: true,
      debt_ratio: 0,
      check_failure_reason: 'string',
    },
    registeredcc_js_check: {
      check_failed: true,
      number_of_registeredcc_js: 0,
      check_failure_reason: 'string',
    },
    cc_js_check: {
      check_failed: true,
      number_ofcc_js: 0,
      check_failure_reason: 'string',
    },
    possiblecc_js_check: {
      check_failed: true,
      number_of_possiblecc_js: 0,
      check_failure_reason: 'string',
    },
    possible_registeredcc_js_check: {
      check_failed: true,
      number_of_possible_registeredcc_js: 0,
      check_failure_reason: 'string',
    },
    satisfiedcc_js_check: {
      check_failed: true,
      number_of_satisfiedcc_js: 0,
      check_failure_reason: 'string',
    },
    writ_of_control_check: {
      check_failed: true,
      number_of_writ_of_control_instances: 0,
      check_failure_reason: 'string',
    },
  },
  companies_house_check: {
    id: 'string',
    name: 'string',
    registration_number: 'string',
    is_not_active_check: {
      check_failed: true,
      status: 'string',
      check_failure_reason: 'string',
    },
    company_age_check: {
      check_failed: true,
      registration_date: '2019-08-24T14:15:22Z',
      check_failure_reason: 'string',
    },
    company_type_check: {
      check_failed: true,
      company_type: 'string',
      check_failure_reason: 'string',
    },
    company_dissolved_recently_check: {
      check_failed: true,
      date_dissolved: '2019-08-24T14:15:22Z',
      check_failure_reason: 'string',
    },
    company_office_in_disputes_check: {
      check_failed: true,
      office_is_in_dispute: true,
      check_failure_reason: 'string',
    },
    directors_with_multiple_appointments_check: {
      check_failed: true,
      directors: [
        {
          appointed_on: '2019-08-24T14:15:22Z',
          date_of_birth: {
            year: 'string',
            month: 0,
          },
          officer_role: 'string',
          name: 'string',
          occupation: 'string',
          country_of_residence: 'string',
          nationality: 'string',
          appointments: [
            {
              appointed_on: '2019-08-24T14:15:22Z',
              occupation: 'string',
              officer_role: 'string',
              resigned_on: '2019-08-24T14:15:22Z',
            },
          ],
        },
      ],
      check_failure_reason: 'string',
    },
    recent_director_resignations_check: {
      check_failed: true,
      directors: [
        {
          appointed_on: '2019-08-24T14:15:22Z',
          date_of_birth: {
            year: 'string',
            month: 0,
          },
          officer_role: 'string',
          name: 'string',
          occupation: 'string',
          country_of_residence: 'string',
          nationality: 'string',
          appointments: [
            {
              appointed_on: '2019-08-24T14:15:22Z',
              occupation: 'string',
              officer_role: 'string',
              resigned_on: '2019-08-24T14:15:22Z',
            },
          ],
        },
      ],
      check_failure_reason: 'string',
    },
    old_directors_check: {
      check_failed: true,
      directors: [
        {
          appointed_on: '2019-08-24T14:15:22Z',
          date_of_birth: {
            year: 'string',
            month: 0,
          },
          officer_role: 'string',
          name: 'string',
          occupation: 'string',
          country_of_residence: 'string',
          nationality: 'string',
          appointments: [
            {
              appointed_on: '2019-08-24T14:15:22Z',
              occupation: 'string',
              officer_role: 'string',
              resigned_on: '2019-08-24T14:15:22Z',
            },
          ],
        },
      ],
      check_failure_reason: 'string',
    },
    young_directors_check: {
      check_failed: true,
      directors: [
        {
          appointed_on: '2019-08-24T14:15:22Z',
          date_of_birth: {
            year: 'string',
            month: 0,
          },
          officer_role: 'string',
          name: 'string',
          occupation: 'string',
          country_of_residence: 'string',
          nationality: 'string',
          appointments: [
            {
              appointed_on: '2019-08-24T14:15:22Z',
              occupation: 'string',
              officer_role: 'string',
              resigned_on: '2019-08-24T14:15:22Z',
            },
          ],
        },
      ],
      check_failure_reason: 'string',
    },
  },
}
