import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT
export const DB = process.env.DB
export const SALTROUND = process.env.SALTROUND
export const JWT_SECRET=process.env.JWT_SECRET

