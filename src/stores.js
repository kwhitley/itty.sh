import { persistable } from './utils/persistable'
import { writable } from 'svelte/store'

// export const headerIsOpen = persistable('header:open', false)
export const headerIsOpen = writable(false)

export const showIntro = persistable('show:intro', null)
// export const hideIntro = writable()
