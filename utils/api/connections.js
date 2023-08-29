import { openBankingService } from 'services/open-banking'
import { rutterService } from 'services/rutter'
import { ECOMMERCE_PLATFORMS, PAYMENT_PLATFORMS } from '../../constants'

export async function loadOpenBankingConnectionsData(organisationId) {
  try {
    return await (
      await openBankingService.getConnectionsCount(organisationId)
    ).data
  } catch (error) {
    return null
  }
}

export async function loadEcommercePlatformsConnectionsData(organisationId) {
  try {
    return await Promise.all(
      ECOMMERCE_PLATFORMS.map(async (ec) => {
        const platform = ec.title
        return await rutterService.getConnectionsCount(
          organisationId,
          platform.replaceAll(' ', ''),
          platform.toLowerCase().replaceAll(' ', '-')
        )
      })
    )
  } catch (error) {
    return null
  }
}

export async function loadPaymentPlatformsConnectionsData(organisationId) {
  try {
    return await Promise.all(
      await Promise.all(
        PAYMENT_PLATFORMS.map((ec) => {
          const platform = ec.title
          return rutterService.getConnectionsCount(
            organisationId,
            platform.replaceAll(' ', ''),
            platform.toLowerCase().replaceAll(' ', '-')
          )
        })
      )
    )
  } catch (error) {
    return null
  }
}
