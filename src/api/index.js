import { fetcher } from 'itty-fetcher'

const dev = import.meta.env.DEV

export const PROTOCOL = dev ? 'http://' : 'https://'
export const DOMAIN = dev ? 'localhost:8787' : 'ity.sh'
export const PATH = `${PROTOCOL}${DOMAIN}`

export const api = fetcher({ base: PATH })
