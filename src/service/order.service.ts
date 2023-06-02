import { Order, OrderStatus } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
import { Prisma } from '@prisma/client';
import prisma from '../client';

export default class OrderService {
  static create = async ({
    farmerId,
    productId,
    quantity,
    landSize,
  }: Pick<
    Order,
    'farmerId' | 'productId' | 'quantity' | 'landSize'
  >): Promise<Order> => {
    try {
      const createdOrder = await prisma.order.create({
        data: {
          farmerId,
          productId,
          quantity,
          landSize,
        },
      });
      return createdOrder;
    } catch (error) {
      throw error;
    }
  };

  static get = async <Key extends keyof Order>(
    id: number,
    keys: Key[] = [
      'id',
      'farmerId',
      'productId',
      'status',
      'quantity',
      'createdAt',
      'updatedAt',
    ] as Key[],
  ): Promise<Pick<Order, Key> | null> => {
    return prisma.order.findUnique({
      where: { id },
      select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    }) as Promise<Pick<Order, Key> | null>;
  };

  static update = async (
    id: number,
    farmerId: number,
    productId: number,
    quantity: number,
    isPaid = false,
    status: OrderStatus,
  ): Promise<Order> => {
    try {
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: {
          farmerId,
          productId,
          quantity,
          isPaid,
          status,
        },
      });
      return updatedOrder;
    } catch (error) {
      throw error;
    }
  };

  static delete = async (id: number): Promise<Order> => {
    try {
      const deletedOrder = await prisma.order.delete({
        where: { id },
      });
      return deletedOrder;
    } catch (error) {
      throw error;
    }
  };

  static getAll = async (
    page: number = 1,
    limit: number = 5,
  ): Promise<Order[]> => {
    const skip = (page - 1) * limit;
    return prisma.order.findMany({
      skip,
      take: limit,
    });
  };
}
