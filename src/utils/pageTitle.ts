import { DEV } from '~/constants'

export const pageTitle = (...args) => [`itty.sh${ DEV ? ' (dev)' : '' }`, ...args].join(' : ')
