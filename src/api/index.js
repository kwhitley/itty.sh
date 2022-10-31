import { fetcher } from 'itty-fetcher'

const dev = import.meta.env.DEV

export const PROTOCOL = dev ? 'http://' : 'https://'
export const PREFIX = dev ? 'localhost:8787' : 'ity.sh'
export const PATH = `${PROTOCOL}${PREFIX}`

export const api = fetcher({ base: PATH })
