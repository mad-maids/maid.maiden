import type { APIHandler } from 'aleph/types.d.ts'

export const handler: APIHandler = ({ response }) => {
  let deno = () => {
    fetch('http://api.d.maid.uz').then(response => {
      if (response.status === 200) {
        return 200
      }
    })
  }
  let node = () => {
    fetch('http://api.n.maid.uz').then(response => {
      if (response.status === 200) {
        return 200
      }
    })
  }
  response.json({ d: deno(), n: node() })
}
