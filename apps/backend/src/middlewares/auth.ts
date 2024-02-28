import express, { Request, Response, NextFunction } from 'express';
import { createClient } from '../lib/supabase';
import { ResolveUserUseCase } from '../usecases/resolveUserUseCase';
import { prisma } from '../lib/prisma';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  // Create supabase client
  const supabase = createClient({ req, res });

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  if (!user) throw new Error('user not found'); // TODO: エラーハンドリング

  const useCase = new ResolveUserUseCase(prisma);

  const _user = await useCase.execute(user.id);
  req.user = _user;
  console.log('resolved user!!!', req.user);
  next();
};
