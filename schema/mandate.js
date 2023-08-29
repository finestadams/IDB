import Joi from 'joi'

export const CREATE_MANDATE = Joi.object().keys({
  organisation: Joi.object()
    .keys({
      id: Joi.string().uuid().required().label('Organisation ID'),
      href: Joi.string().allow(null).label('Organisation HREF'),
      trading_name: Joi.string().allow(null).label('Organisation Trading Name'),
      registered_name: Joi.string()
        .allow(null)
        .required()
        .label('Organisation Registered Name'),
      registration_number: Joi.string()
        .allow(null)
        .required()
        .label('Organisation Registeration Number'),
      bank_accounts: Joi.array()
        .allow(null)
        .optional()
        .label('Organisation Bank Accounts'),
    })
    .optional(),

  account: Joi.object()
    .keys({
      id: Joi.string().uuid().required().label('Account GUID'),
      type: Joi.string().allow(null).label('Account Type'),
      iban: Joi.string().allow(null).label('Account IBAN'),
      account_number: Joi.string().allow(null).label('Account Number'),
      sort_code: Joi.string().allow(null).label('Account Sort Code'),
      swift_bic: Joi.string().allow(null).label('Account SWIFT BIC'),
      currency: Joi.string()
        .valid('GBP', 'EUR')
        .allow(null)
        .label('Account Currency'),
      display_name: Joi.string().allow(null).label('Account Display Name'),
      account_provider_id: Joi.string()
        .allow(null)
        .label('Account Provider ID'),
      account_provider_name: Joi.string()
        .allow(null)
        .label('Account Provider Name'),
      account_provider_country: Joi.string()
        .allow(null)
        .label('Account Provider Country'),
      account_provider_logo_url: Joi.string()
        .allow(null)
        .label('Account Provider Logo URL'),
    })
    .optional(),

  valid_from: Joi.date().min(new Date()).required().label('Valid From'),
  valid_to: Joi.date().min(new Date()).required().label('Valid To'),
  currency: Joi.valid('GBP', 'EUR').required().label('Currency'),
  maximum_individual_amount: Joi.number()
    .min(0)
    .required()
    .label('Maximum Individual Amount'),
  maximum_periodic_amount: Joi.number()
    .min(0)
    .required()
    .label('Maximum Periodic Amount'),
  periodic_alignment_type: Joi.valid(
    ...['Consent', 'Calendar'].map((i) => i.toLowerCase())
  )
    .required()
    .label('Periodic Alignment Type'),
  periodic_limit_type: Joi.valid(
    ...['Day', 'Week', 'Month', 'Fortnight', 'Half Year', 'Year'].map((i) =>
      i.toLowerCase().replaceAll(' ', '_')
    )
  )
    .required()
    .label('Periodic Limit Type'),
})
