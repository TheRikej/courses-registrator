/* IMPORTANT: Do NOT modify this file */
/* eslint-disable no-console */
import prisma from '../repositories/client';
import data from '../../data/seed_data.json';
import type { UserJson } from './types';

// Create user queries
const userCreateQueries = data.users.map(
  (user : UserJson) => prisma.user.create({
    data: {
      ...user,
    },
  }),
);

const seed = async () => {
  console.log(`[${new Date(Date.now()).toISOString()}]: Seeding started`);
  try {
    await prisma.$transaction([
      ...userCreateQueries,
    ]);

    console.log(`[${new Date(Date.now()).toISOString()}]: Seeding succesful!`);
  } catch (e) {
    console.log(e);
    console.log(`[${new Date(Date.now()).toISOString()}]: Seeding was not successful. Aborting!`);
  }
};

seed();
