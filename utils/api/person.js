import { lenkieApi, lenkieCompositionApi } from '~/utils/api'

export async function getPersonData() {
  const { data } = await lenkieCompositionApi.get('/Me')
  return data
}

export async function getPersonDataForOnboarding() {
  const { data } = await lenkieApi.get('/me')
  return data
}
