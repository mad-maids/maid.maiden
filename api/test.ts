import type { APIHandler } from 'aleph/types.d.ts'

export const handler: APIHandler = ({ response }) => {
  response.json({ message: 'success', status: 200 })
}
