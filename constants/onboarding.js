export const ECOMMERCE_PLATFORMS = [
  {
    name: 'Amazon',
    event: 'amazon',
  },
  {
    name: 'Shopify',
    event: 'shopify',
  },
  {
    name: 'BackMarket',
    event: 'backmarket',
  },
  {
    name: 'Etsy',
    event: 'etsy',
  },
  {
    name: 'Prestashop',
    event: 'prestashop',
  },
  {
    name: 'Woo Commerce',
    event: 'woo_commerce',
  },
  {
    name: 'Big Commerce',
    event: 'big_commerce',
  },
  {
    name: 'Squarespace',
    event: 'squarespace',
  },
  {
    name: 'Ebay',
    event: 'eBay',
  },
  {
    name: 'Magento',
    event: 'magento',
  },
].map((pl) => ({
  ...pl,
  event: 'connect_' + pl.event.toLowerCase().replaceAll(' ', '_'),
  link:
    '/icons/ic-' +
    pl.event.toLowerCase().replaceAll(' ', '-').replaceAll('_', '-') +
    '.svg',
  platform: pl.event.toUpperCase(),
}))

export const PAYMENT_PLATFORMS = [
  {
    title: 'Stripe',
    event: 'stripe',
    link: process.env.STRIPE_URL,
  },
  {
    title: 'Square',
    event: 'square',
  },
].map((pl) => ({
  ...pl,
  event: 'connect_' + pl.event.toLowerCase().replaceAll(' ', '_'),
  platform: pl.event.toUpperCase(),
}))

export const ACCOUNTING_PLATFORMS = [
  {
    name: 'Quickbooks',
    event: 'quickbooks',
  },
  {
    name: 'Xero',
    event: 'xero',
  },
].map((pl) => ({
  ...pl,
  event: 'connect_' + pl.event.toLowerCase().replaceAll(' ', '_'),
  link:
    '/icons/ic-' +
    pl.event.toLowerCase().replaceAll(' ', '-').replaceAll('_', '-') +
    '.svg',
  platform: pl.event.toUpperCase(),
}))
