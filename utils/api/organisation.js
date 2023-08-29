import { organisationService } from 'services/organisation'

export async function getOrganisation(setOrganisation) {
  try {
    const { data: organisationData } =
      await organisationService.getMyOrganisation()
    return organisationData
  } catch (error) {
    return null
  }
}
