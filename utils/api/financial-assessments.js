import { financeApi } from 'utils'

export async function getFinancialAssessments(sellerId) {
  try {
    const { data } = await financeApi.get(
      `/FinancialAssessments/Seller/${sellerId}`
    )
    return data
  } catch (error) {
    return null
  }
}
