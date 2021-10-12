---
title: Confession
authors:
  - uwussimo
---

# Confession

### Links & Clients

- **Channel:** [general](https://t.me/maidession)
- **Client Bot by Mad Maids:** [bots](https://t.me/westmaid)

Feel free to add your own client here...

### Send Message

- **Url:** `/confession/text/:content`
- **Type:** `GET`
- **Required:** Must be 32+ characters long

Send message to the channel anonymously.

**@returns:
`/confession/text/Lorem ipsum dolor sit amet, consectetur adipiscing elit.`**

```json
{
  "status": "success",
  "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
}
```

### Send Photo `(beta)`

- **Url:** `/confession/image`
- **Type:** `POST`
- **Required:** `content: URL | FileID`, `message: string` as headers

Send photo to the channel anonymously.

**@returns: `/confession/image/` headers: content=https://image.com/example
message=Hello World**

```json
{
  "status": "sent"
}
```
