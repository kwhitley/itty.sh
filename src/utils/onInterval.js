import { onMount, onDestroy } from 'svelte'

export function onInterval(callback, milliseconds, options = {}) {
  const { autostart = false } = options

  let interval

  const start = () => {
    if (!interval) {
      const wrapped = () => {
        callback()
      }

      interval = setInterval(wrapped, milliseconds)
    }
  }
  const stop = () => {
    clearInterval(interval)
    interval = undefined
  }

	onDestroy(stop)

  if (autostart) {
    onMount(start)
  }

  return {
    start,
    stop,
  }
}
