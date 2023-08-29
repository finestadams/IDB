import { faker } from '@faker-js/faker'

export const MOCK_BANK_ACCOUNTS = new Array(5).map(() => ({
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
