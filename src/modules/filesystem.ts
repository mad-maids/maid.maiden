import { timetableDirectory, intranetDirectory } from '../config';
import Keyv from 'keyv';
import { promises as fs, existsSync } from 'fs';
import path from 'path';
import chalk from 'chalk';

const cache = new Keyv();

export async function getGroups(app: string): Promise<string[]> {
  const found = await cache.get(`groups-${app}`);
  if (found) return found;

  const direct = async (): Promise<any> => {
    switch (app) {
      case 'timetable':
        return timetableDirectory;
      case 'intranet':
        return intranetDirectory;
    }
  };

  const types = await fs.readdir((await direct())(''));

  await cache.set(`groups-${app}`, types);
  console.log('added types to cache');

  return types;
}

export async function getAvailableTimetables(
  type: string,
): Promise<string[] | null> {
  const found = await cache.get(`timetable-${type}`.toLowerCase());
  if (found) return found;

  const exists = existsSync(timetableDirectory(type));
  if (!exists) throw new Error(`Type ${type} not found`);

  const entities = await fs.readdir(timetableDirectory(type));
  for (const entity in entities)
    entities[entity] = entities[entity].replace('.json', '');

  await cache.set(`timetable-${type}`, entities);
  console.log(
    chalk.blue('[Cache-Timetable]'),
    chalk.green(`(${type})`),
    'Added to the cache',
  );
  return entities;
}

export async function getTimetable(type: string, id: string): Promise<any> {
  const cacheId = `timetable-${type}-${id}`.toLowerCase();
  const found = await cache.get(cacheId);
  if (found) return found;

  const filePath = path
    .join(timetableDirectory(type), `${id}.json`)
    .normalize();

  const exists = existsSync(filePath);
  if (!exists) {
    let errorMessage = `Entity ${type}/${id} not found`;
    const filePath = path
      .join(timetableDirectory(type), `${id}.json`)
      .normalize();

    const fileExists = existsSync(filePath);
    if (fileExists) errorMessage += `, file would exist`;

    throw new Error(errorMessage);
  }

  const file = await fs.readFile(filePath);
  try {
    const entity = JSON.parse(file.toString('utf-8'));
    await cache.set(cacheId, entity);
    console.log(
      chalk.blue('[Cache-Timetable]'),
      chalk.green(`(${type})`),
      'Added',
      chalk.yellow(id),
      'to the cache',
    );
    return entity;
  } catch (e) {
    throw new Error(
      `Error in JSON formatting of Entity ${type}/${id}, create an issue at https://github.com/genshindev/api/issues`,
    );
  }
}

export async function getAvailableIntranet(
  type: string,
): Promise<string[] | null> {
  const found = await cache.get(`intranet-${type}`.toLowerCase());
  if (found) return found;

  const exists = existsSync(intranetDirectory(type));
  if (!exists) throw new Error(`Type ${type} not found`);

  const entities = await fs.readdir(intranetDirectory(type));
  for (const entity in entities)
    entities[entity] = entities[entity].replace('.json', '');

  await cache.set(`intranet-${type}`, entities);
  console.log(
    chalk.blue('[Cache-Intranet]'),
    chalk.green(`(${type})`),
    'Added to the cache',
  );
  return entities;
}

export async function getIntranet(type: string, id: string): Promise<any> {
  const cacheId = `intranet-${type}-${id}`.toLowerCase();
  const found = await cache.get(cacheId);
  if (found) return found;

  const filePath = path.join(intranetDirectory(type), `${id}.json`).normalize();

  const exists = existsSync(filePath);
  if (!exists) {
    let errorMessage = `Entity ${type}/${id} not found`;
    const filePath = path
      .join(intranetDirectory(type), `${id}.json`)
      .normalize();

    const fileExists = existsSync(filePath);
    if (fileExists) errorMessage += `, file would exist`;

    throw new Error(errorMessage);
  }

  const file = await fs.readFile(filePath);
  try {
    const entity = JSON.parse(file.toString('utf-8'));
    await cache.set(cacheId, entity);
    console.log(
      chalk.blue('[Cache-Intranet]'),
      chalk.green(`(${type})`),
      'Added',
      chalk.yellow(id),
      'to the cache',
    );
    return entity;
  } catch (e) {
    throw new Error(
      `Error in JSON formatting of Entity ${type}/${id}, create an issue at https://github.com/genshindev/api/issues`,
    );
  }
}
