---
title: Timetable
authors:
  - uwussimo
---

# Timetable

> Attention!
> Putting slash means to get result from server whereas removing slash may result forwarding to documentation page

> `/timetable` -> sends you to documentation page

> `/timetable/` -> gets response from server

### Index

- **Url:** `/timetable/`
- **Type:** `GET`

Get the list of available faculties.

**@returns: `/intranet`**

```json
[
  "6ECWF11",
  "4FIN8",
  "5CL6",
  "5BMMAR10",
  "5FIN2",
  "6BABM3",
  "..."
]
```

### Groups

- **Url:** `/timetable/:type`
- **Type:** `GET`

Get the list of available groups that has timetable stored on our database.

**@returns: `/intranet/5BIS`**

```json
[
  "5BIS1",
  "5BIS2",
  "5BIS3",
  "5BIS4",
  "5BIS5",
  "5BIS6"
]
```

### All

- **Url:** `/timetable/:type/all`
- **Type:** `GET`

Get the list of all timetables of all available groups that has timetable stored
on our database.

**@returns: `/intranet/5BIS/all`**

```json
[
  {
    // Weekdays starting from Sunday with 0
    "0": [],
    "1": [
      {
        "name": "Game Development",
        "tutor": "Akmal Salikov",
        "type": "seminar",
        "start": 14,
        "length": 2,
        "location": "New305 CL"
      },
      {
        "name": "Database Systems Development",
        "tutor": "Dmitriy Pochitaev",
        "type": "workshop",
        "start": 16,
        "length": 2,
        "location": "New304 CL"
      }
  ...
  {
    // Another group's by sequence
    "0": [],
    "1": [
      {
        "name": "Game Development",
        "tutor": "Akmal Salikov",
        "type": "seminar",
        "start": 14,
        "length": 2,
        "location": "New305 CL"
      },
  ...
]
```

### Timetable

- **Url:** `/timetable/:type/:id`
- **Type:** `GET`

Get timetable of specific group.

**@returns: `/intranet/5BIS/5BIS1`**

```json
[
  {
    // Weekdays starting from Sunday with 0
    "0": [],
    "1": [
      {
        "name": "Game Development",
        "tutor": "Akmal Salikov",
        "type": "seminar",
        "start": 14,
        "length": 2,
        "location": "New305 CL"
      },
      {
        "name": "Database Systems Development",
        "tutor": "Dmitriy Pochitaev",
        "type": "workshop",
        "start": 16,
        "length": 2,
        "location": "New304 CL"
      }
  ...
]
```
