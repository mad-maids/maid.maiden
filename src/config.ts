import path from 'path';

// Telegram Bot
export const env = process.env

// API Assets
export const timetableDirectory = (type: string) =>
  path.join(__dirname, '../assets/timetable', type);
export const intranetDirectory = (type: string) =>
  path.join(__dirname, '../assets/intranet', type);
