import { path } from "./deps.ts";

// Rate Limit
export const redisUrl = Deno.env.get("REDIS_URL");

const __filename = path.fromFileUrl(import.meta.url);
const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

// Telegram Bot
export const channel = Deno.env.get("CHANNEL") || "-1001785784747";
export const token = Deno.env.get("TOKEN") ||
  "2059294408:AAFZrRNbMqxIX6dZ74vnbdCHxq4lQlc6U6I";

// API Assets
export const timetableDirectory = (type: string) =>
  path.join(__dirname, "../assets/timetable", type);
export const intranetDirectory = (type: string) =>
  path.join(__dirname, "../assets/intranet", type);
