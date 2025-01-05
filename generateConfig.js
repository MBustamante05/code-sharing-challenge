import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const configContent = `
export const {
  MONGO_URI,
  PORT,
  NODE_ENV,
} = process.env;
`;
fs.writeFileSync('./config.js', configContent);
console.log('Config file generated.');
