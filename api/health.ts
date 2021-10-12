import type { APIHandler } from 'aleph/types.d.ts'

const deno = () => {
  fetch('http://api.d.maid.uz').then(response => {
    if (response.status === 200) {
      return 200
    }
  })
}
const node = () => {
  fetch('http://api.n.maid.uz').then(response => {
    if (response.status === 200) {
      return 200
    }
  })
}

export const handler: APIHandler = ({ response }) => {
  response.json({ d: deno(), n: node() })
}
