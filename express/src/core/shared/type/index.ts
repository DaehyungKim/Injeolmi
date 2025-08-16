import { Request } from 'express';
export type Model = {
  id: number;
  createdAt: Date;
  updatedAt?: Date; 
}

export type ModelResponse = {
  id: number;
  createdAt: string; 
  updatedAt?: string;
}

export type AuthRequest = Request & {
  user?: any
}

export type UserPayload = {
    userId: string; 
    email: string;
}
