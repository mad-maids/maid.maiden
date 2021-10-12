---
title: Intranet
authors:
  - uwussimo
---

# Intranet

### Index

- **Url:** `/intranet`
- **Type:** `GET`

Get the list of available faculties.

**@returns: `/intranet`**
```json
{
  "types": [
    "4BIS",
    "5BIS",
    ...
  ]
}
```

### Modules

- **Url:** `/timetable/:type`
- **Type:** `GET`

Get the list of available modules stored on our database.

**@returns: `/intranet/5BIS`**
```json
[
  "dsd",
  "gd",
  "mad",
  "oop"
]
```

### All

- **Url:** `/timetable/:type/all`
- **Type:** `GET`

Get the list of all modules contents for a specific faculty.

**@returns: `/intranet/5BIS/all`**
```json
[
  {
    "Useful": [
      {
        "name": "Telegram Group",
        "link": "https://t.me/joinchat/fIhsOD-oASoyZWVi"
      },
      {
        "name": "SQL Server Express 2019",
        "link": "https://www.microsoft.com/en-US/download/details.aspx?id=55994"
      },
    ...
    "Seminar 1 (ER Concepts)": [
      {
        "name": "DB intro ER model concepts",
        "link": "https://intranet.wiut.uz/Uploads/LearningMaterialFiles/31/3356/L01%20DB%20intro%20ER%20model%20concepts.pptx"
      },
  ...
]
```

### Module

- **Url:** `/timetable/:type/:id`
- **Type:** `GET`

Get intranet of specific module.

**@returns: `/intranet/5BIS/dsd`**
```json
{
  "Useful": [
    {
      "name": "Telegram Group",
      "link": "https://t.me/joinchat/fIhsOD-oASoyZWVi"
    },
    {
      "name": "SQL Server Express 2019",
      "link": "https://www.microsoft.com/en-US/download/details.aspx?id=55994"
    },
    {
      "name": "SQL Server Management Studio",
      "link": "https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15"
    },
    {
      "name": "DBeaver (Community Edition)",
      "link": "https://dbeaver.io/"
    },
  ...
  ]
}
```