import { datePlus, getSeconds } from 'itty-time'
import { random } from 'supergeneric/random'
import { postResults } from '~/stores'
import { api, PATH } from '.'

type PostConfig = {
  ttl?: string,
  as?: string,
  length?: number,
}

let timer = undefined

const randomDelay = response => new Promise(resolve => setTimeout(() => resolve(response), random(0,0)))

const randomError = response => {
  if (Math.random() < 0.2) {
    throw Error('Could not upload this file.')
  }

  return response
}

export const post = (payloads: any[], config: PostConfig = {}) => {
  const { ttl, as = '', length } = config
  clearTimeout(timer) // clear any existing timer that may exist

  const entries = payloads.map(p => {
    const entry = {
      content: p,
      isFile: p instanceof File ? true : false,
      filename: p instanceof File ? p.name : undefined,
      submitting: true,
    }

    return entry
  })

  postResults.set({
    entries,
    submitting: true,
    success: false,
    ttl,
  })

  const promises = entries.map((item, index) => {
    const extra = { headers: {} }

    // add filename to headers
    if (item.isFile) {
      extra.headers.filename = item.filename
    }

    return api.post(`/create?length=${length}&ttl=${ttl.replace(/\s/,'')}${as}`, item.content, extra)
              // .then(randomDelay)
              // .then(randomError)
              .then(response => {
                postResults.update(p => {
                  let entry = p.entries[index]

                  entry.submitting = false
                  entry.key = response.key
                  entry.type = response.type
                  entry.url =`${PATH}/${entry.key}`
                  entry.expires = datePlus(ttl)

                  return p
                })
              })
              .catch(error => {
                postResults.update(p => {
                  let entry = p.entries[index]

                  entry.submitting = false
                  entry.error = error.message

                  return p
                })
              })
  })

  return Promise.allSettled(promises).then(() => {
    postResults.update(p => {
      p.submitting = false
      p.success = !p.entries.find(e => e.error)
      p.errors = p.entries.map(e => e.error).filter(v => v)

      return p
    })
  }).then(() => {
    timer = setTimeout(() => postResults.update(p => ({ ...p, expired: true })), getSeconds(ttl) * 1000)
  })
}
