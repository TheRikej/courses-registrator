/* IMPORTANT: Do NOT modify this file */
/* These are the types of the data from the JSON document */
export type UserJson = {
    id: string;
    userName: string;
    email: string;
    createdAt: string;
    deletedAt?: string;
    hashedPassword: string;
    salt: string;
  };
  