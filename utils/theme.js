import { EventBus } from './bus'

export function applyFavicon(link, type = 'image/svg') {
  let $favicon = document.querySelector('link[rel="icon"]')
  // If a <link rel="icon"> element already exists,
  // change its href to the given link.
  if ($favicon !== null) {
    $favicon.href = link
    $favicon.type = type
    // Otherwise, create a new element and append it to <head>.
  } else {
    $favicon = document.createElement('link')
    $favicon.rel = 'icon'
    $favicon.href = link
    $favicon.type = type
    document.head.appendChild($favicon)
  }
}

const DEFAULT_COLORS = [
  ['--theme-banner', '#1a2d5b'],
  ['--theme-banner-text', '#fff'],
  ['--theme-banner-border', '#1a2d5b'],

  ['--theme-footer', '#1a2d5b'],
  ['--theme-footer-text', '#fff'],

  ['--theme-navbar-bg', '#1a2d5b'],
  ['--theme-navbar-text', '#fff'],
  ['--theme-primary', '#1a2d5b'],
  ['--theme-primary-negative', 'rgba(39, 56, 100, 0.15)'],
  ['--theme-primary-negative-z', 'rgba(39, 56, 100)'],
  ['--theme-primary-negative-y', '#ebedf5'],
  ['--theme-green', '#27ae60'],
  ['--theme-primary-dark', '#16264c'],
  ['--theme-secondary', '#f5a623'],
  ['--theme-secondary-lighter', 'rgba(245, 166, 35, 0.2)'],
  ['--theme-yellow', '#ffd965'],
  ['--theme-blue', '#007aff'],
  ['--theme-blue-2', '#3554d1'],
  ['--theme-blue-3', '#3e59cc'],
  ['--theme-blue-light', 'rgba(53, 84, 209, 0.08)'],
  ['--theme-primary-lighter', '#a4a6b3'],
  ['--theme-primary-lighter-2', 'rgba(159, 162, 180, 0.1)'],
  ['--theme-primary-lighter-3', '#96a0b5'],
  ['--theme-black', '#121f3e'],
  ['--theme-gray-lighter', '#f2f5fd'],
  ['--theme-gray', '#585252'],
  ['--theme-gray-2', '#4a4a4b'],
  ['--theme-gray-3', '#757575'],
  ['--theme-gray-light', '#e5e5e5'],
  ['--theme-white-transparent', 'rgba(255, 255, 255, 0.8)'],
  ['--theme-sidemenu-item-bg', 'rgba(245, 166, 35, 0.1)'],
  ['--theme-primary-text', '#1a2d5b'],
  ['--theme-primary-text-lighter', '#a4a6b3'],
  ['--theme-mobile-sidebar', '#1a2d5b'],
  ['--theme-text-oa', '#fff'],
]

export function resetToDefaultTheme() {
  DEFAULT_COLORS?.forEach(([variable, value], index) => {
    document.documentElement.style.setProperty(variable, value)
    if (index + 1 === DEFAULT_COLORS.length) {
      setTimeout(() => EventBus.$emit('theme-loaded', true), 800)
    }
  })
}
