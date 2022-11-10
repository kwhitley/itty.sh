import { writable } from 'svelte/store'
import { getSeconds } from 'itty-time'

export const toastMessage = writable()
export const toastIsOpen = writable(false)
export const toastOptions = writable({})

type ToastOptions = {
  duration?: string,
  type?: string,
}

let timer = undefined
let closer = undefined

export const toast = async (message: string | HTMLElement, options?: ToastOptions) => {
  const { duration = '3 seconds' } = options || {}

  if (closer) {
    await closer()
  }

  toastMessage.set(message)
  toastIsOpen.set(true)
  toastOptions.set(options || {})

  const close = closer = async () => {
    toastIsOpen.set(false)
    closer = undefined

    await new Promise(resolve => setTimeout(resolve, 200))
  }

  clearTimeout(timer)
  timer = setTimeout(close, getSeconds(duration) * 1000)
}
