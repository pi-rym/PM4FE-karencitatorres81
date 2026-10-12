import { CreateOrderDto } from "../dtos/createOrderDto";
import { Order } from "../entities/Order";
import { OrderRepository } from "../repositories/order.repository";
import { ProductRepository } from "../repositories/product.repository";
import { UserRepository } from "../repositories/user.repository";

// Crear una nueva compra
export const createOrderService = async (
  createOrderDto: CreateOrderDto,
): Promise<Order> => {
  const productsF = [];

  for await (const id of createOrderDto.products) {
    const product = await ProductRepository.findOneBy({ id });

    if (!product) {
      throw new Error("Product not found");
    }

    productsF.push(product);
  }

  const userF = await UserRepository.findOneBy({
    id: createOrderDto.userId,
  });

  if (!userF) {
    throw new Error("User not found");
  }

  const newOrder = OrderRepository.create();

  newOrder.status = "approved";
  newOrder.date = new Date();
  newOrder.user = userF;
  newOrder.products = productsF;

  await OrderRepository.save(newOrder);

  return newOrder;
};

// Obtener el historial de compras de un usuario
export const getUserOrdersService = async (
  userId: number,
): Promise<Order[]> => {
  const orders = await OrderRepository.find({
    where: {
      user: {
        id: userId,
      },
    },
    relations: {
      products: true,
    },
    order: {
      date: "DESC",
    },
  });

  return orders;
};
