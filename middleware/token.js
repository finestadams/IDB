export default function ({
  $auth,
  $lenkieCompositionApi,
  $lenkieApi,
  $rutterApi,
  $openBankingApi,
  $financeApi,
  $internalApi,
}) {
  let token = $auth.$storage?._state['_token.oidc'] || ''
  token = token.split(' ')[1]

  $lenkieCompositionApi.setToken(token, 'Bearer')
  $lenkieApi.setToken(token, 'Bearer')
  $rutterApi.setToken(token, 'Bearer')
  $openBankingApi.setToken(token, 'Bearer')
  $financeApi.setToken(token, 'Bearer')
  $internalApi.setToken(token, 'Bearer')
}
