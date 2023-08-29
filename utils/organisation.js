const parseCompanyHouseOrganisationToFormat = (organisation) => ({
  trading_name: organisation.title,
  registered_name: organisation.title,
  registration_number: organisation.company_number,
  founding_date: organisation.date_of_creation,
  physical_address: {
    street_address: organisation.physical_address?.street_address,
    suburb: organisation.physical_address?.suburb,
    town: organisation.physical_address?.town,
    state: organisation.physical_address?.state,
    postal_code: organisation.physical_address?.postal_code,
    country: {
      href: organisation.physical_address?.country?.href,
    },
  },
})

const createDirectorPatchDocument = (directors) => {
  const patchDoc = []

  for (const d of directors) {
    patchDoc.push({
      op: 'add',
      path: `/directors/-`,
      value: {
        id: d.id,
        givenName: d.first_name,
        familyName: d.last_name,
      },
    })
  }

  return patchDoc
}

function patchOrganisation(organisation, directorPatch) {
  let doc = [
    {
      path: '/trading_name',
      op: 'replace',
      value: organisation.trading_name || null,
    },
    {
      path: '/registered_name',
      op: 'replace',
      value: organisation.registered_name || null,
    },
    {
      path: '/registration_number',
      op: 'replace',
      value: organisation.registration_number || null,
    },
    {
      path: '/vat_id_number',
      op: 'replace',
      value: organisation.vat_id_number || null,
    },
    {
      path: '/founding_date',
      op: 'replace',
      value: organisation.founding_date || null,
    },
    {
      path: '/website',
      op: 'replace',
      value: organisation.website || null,
    },
    {
      path: '/physical_address/street_address',
      op: 'replace',
      value: organisation.physical_address?.street_address || null,
    },
    {
      path: '/physical_address/suburb',
      op: 'replace',
      value: organisation.physical_address?.suburb || null,
    },
    {
      path: '/physical_address/town',
      op: 'replace',
      value: organisation.physical_address?.town || null,
    },
    {
      path: '/physical_address/state',
      op: 'replace',
      value: organisation.physical_address?.state || null,
    },
    {
      path: '/physical_address/postal_code',
      op: 'replace',
      value: organisation.physical_address?.postal_code || null,
    },
    {
      path: '/physical_address/country/href',
      op: 'replace',
      value: organisation.physical_address?.country?.href || null,
    },
    {
      path: '/work_phone_number',
      op: 'replace',
      value: organisation.work_phone_number || null,
    },
    {
      path: '/work_email_address',
      op: 'replace',
      value: organisation.work_email_address || null,
    },
    {
      path: '/banking_details/account_number',
      op: 'replace',
      value: organisation.banking_details?.account_number || null,
    },
    {
      path: '/banking_details/account_holder',
      op: 'replace',
      value: organisation.banking_details?.account_holder || null,
    },
    {
      path: '/banking_details/bank_name',
      op: 'replace',
      value: organisation.banking_details?.bank_name || null,
    },
    {
      path: '/banking_details/sort_code',
      op: 'replace',
      value: organisation.banking_details?.sort_code || null,
    },
  ]

  if (directorPatch) {
    doc = doc.concat(directorPatch)
  }

  return doc
}

export {
  parseCompanyHouseOrganisationToFormat,
  createDirectorPatchDocument,
  patchOrganisation,
}
