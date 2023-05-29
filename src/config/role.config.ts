import { Role } from '@prisma/client';

const allRoles = {
  [Role.USER]: ['placeOrder'],
  [Role.STORE]: ['manageFertilizer', 'manageOrder', 'manageUser'],
  [Role.ADMIN]: [
    'manageFertilizer',
    'manageOrder',
    'manageUser',
    'manageStore',
  ],
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
