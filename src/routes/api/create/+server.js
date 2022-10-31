import { json } from '@sveltejs/kit'
import { api } from '~/api'

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const { value, type } = await request.json()

  console.log('POSTING', { value, type })

  const response = await api.post('/create', value)
  console.log('response was', response)

  return json(response)
}
