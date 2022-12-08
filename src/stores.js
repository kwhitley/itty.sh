import { persistable } from './utils/persistable'
import { writable } from 'svelte/store'

export const headerIsOpen = writable(false)
export const showIntro = persistable('show:intro', null)
export const keyLength = persistable('keyLength', 8)
export const ttl = persistable('ttl', 8)
export const textTTL = persistable('text-ttl', '')
export const postResults = writable()
