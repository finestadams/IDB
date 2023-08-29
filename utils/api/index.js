import axios from 'axios'

async function fetchToken() {
  const token = ''
  return (await 'Bearer ') + token
}

const lenkieApi = axios.create({
  baseURL: process.env.LENKIE_API_URL,
})

lenkieApi.interceptors.request.use(async function (config) {
  // Do something before request is sent
  config.headers.Authorization = await fetchToken()
  return config
})

const lenkieCompositionApi = axios.create({
  baseURL: process.env.LENKIE_COMPOSITION_API_URL,
})

lenkieCompositionApi.interceptors.request.use(async function (config) {
  // Do something before request is sent
  config.headers.Authorization = await fetchToken()
  return config
})

const rutterApi = axios.create({
  baseURL: process.env.RUTTER_API,
})

rutterApi.interceptors.request.use(async function (config) {
  // Do something before request is sent
  config.headers.Authorization = await fetchToken()
  return config
})

const openBankingApi = axios.create({
  baseURL: process.env.OPEN_BANKING_API_URL,
})

openBankingApi.interceptors.request.use(async function (config) {
  // Do something before request is sent
  config.headers.Authorization = await fetchToken()
  return config
})

const financeApi = axios.create({
  baseURL: process.env.CASH_ADVANCE_API,
})

financeApi.interceptors.request.use(async function (config) {
  // Do something before request is sent
  config.headers.Authorization = await fetchToken()
  return config
})

const stripeApi = axios.create({
  baseURL: process.env.STRIPE_API_URL,
})

stripeApi.interceptors.request.use(async function (config) {
  // Do something before request is sent
  config.headers.Authorization = await fetchToken()
  return config
})

export {
  lenkieApi,
  rutterApi,
  openBankingApi,
  financeApi,
  lenkieCompositionApi,
  stripeApi,
}
