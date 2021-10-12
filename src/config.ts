import path from 'path';

// Rate Limit
export const redis_url = process.env.REDIS_URL;

// Telegram Bot
export const channel = process.env.CHANNEL || '-1001785784747';
export const token =
  process.env.TOKEN || '2059294408:AAFZrRNbMqxIX6dZ74vnbdCHxq4lQlc6U6I';

// API Assets
export const timetableDirectory = (type: string) =>
  path.join(__dirname, '../assets/timetable', type);
export const intranetDirectory = (type: string) =>
  path.join(__dirname, '../assets/intranet', type);
