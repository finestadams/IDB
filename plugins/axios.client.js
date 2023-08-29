export default function ({ $axios, $config }, inject) {
  const lenkieCompositionApi = $axios.create({
    baseURL: $config.LENKIE_COMPOSITION_API_URL,
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
  })

  const lenkieApi = $axios.create({
    baseURL: $config.LENKIE_API_URL,
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
  })

  const rutterApi = $axios.create({
    baseURL: $config.RUTTER_API,
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
  })

  const openBankingApi = $axios.create({
    baseURL: $config.OPEN_BANKING_API_URL,
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
  })

  const stripeApi = $axios.create({
    baseURL: $config.STRIPE_API_URL,
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
  })

  const financeApi = $axios.create({
    baseURL: $config.CASH_ADVANCE_API,
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
  })

  const internalApi = $axios.create({
    baseURL: $config.INTERNAL_API,
    headers: {
      common: {
        Accept: 'application/json',
      },
    },
  })

  inject('lenkieCompositionApi', lenkieCompositionApi)
  inject('lenkieApi', lenkieApi)
  inject('rutterApi', rutterApi)
  inject('openBankingApi', openBankingApi)
  inject('stripeApi', stripeApi)
  inject('financeApi', financeApi)
  inject('internalApi', internalApi)
}
