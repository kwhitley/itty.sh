export const LOGGING = import.meta.env.VITE_LOGGING === 'true'
export const VERSION = __VERSION__
export const DEV = import.meta.env.DEV

// APP SETTINGS
export const MAX_UPLOADS = 20
export const MAX_FILESIZE = 1024 * 1024 * 200 // 50 MB

// FILE SIZE THRESHOLDS AND TTL LIMITS
export const FILE_SIZE_LIMITS = [
  {
    threshold: 1024 * 1024 * 50, // 50 MB
    maxTTL: '1 day',
    description: 'quite large',
    category: 'xlarge'
  },
  {
    threshold: 1024 * 1024 * 10, // 10 MB
    maxTTL: '1 month',
    description: 'pretty big',
    category: 'large'
  }
]
