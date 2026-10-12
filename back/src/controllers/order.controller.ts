import { Request, Response } from "express";

import {
  createOrderService,
  getUserOrdersService,
} from "../services/order.service";

import { catchedController } from "../utils/catchedController";

// Crear una nueva compra
export const createOrder = catchedController(
  async (req: Request, res: Response) => {
    const { products } = req.body;
    const userId = req.body.userId;

    const newOrder = await createOrderService({
      userId,
      products,
    });

    res.send(newOrder);
  },
);

// Consultar las compras del usuario autenticado
export const getUserOrders = catchedController(
  async (req: Request, res: Response) => {
    // ID obtenido del JWT por checkLogin
    const userId = req.body.userId;

    // Consultar las órdenes del usuario
    const orders = await getUserOrdersService(userId);

    // Devolver el historial de compras
    res.status(200).json(orders);
  },
);
