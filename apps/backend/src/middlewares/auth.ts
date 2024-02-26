import express, { Request, Response, NextFunction } from 'express';
import { createClient } from '../lib/supabase';

interface Header {
  token: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  // Create supabase client

  const supabase = createClient({ req, res });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;

  next();
};
