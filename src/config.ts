import path from 'path';

export const timetableDirectory = (type: string) =>
  path.join(__dirname, '../assets/timetable', type);
export const intranetDirectory = (type: string) =>
  path.join(__dirname, '../assets/intranet', type);
