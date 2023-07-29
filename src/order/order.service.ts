import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAllOrders(storeId: string) {
    const orders = await this.prismaService.order.findMany({
      where: {
        storeId: storeId,
      },
      select: {
        id: true,
        address: true,
        phone: true,
        isPaid: true,
        isDelivered: true,
        deliveredAt: true,
        createdAt: true,
        quantity: true,
        orderItems: {
          select: {
            id: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                Sizes: {
                  select: {
                    value: true,
                  },
                },
                Colors: {
                  select: {
                    value: true,
                  },
                },
                Images: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (!orders) throw new NotFoundException('Orders not found');
    return orders;
  }
}