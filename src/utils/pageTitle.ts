import { DEV } from '~/constants'

export const pageTitle = (...args) => [`itty${ DEV ? ' (dev)' : '' }`, ...args].join(' - ')
