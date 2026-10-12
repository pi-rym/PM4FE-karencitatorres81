import { Router } from "express";

import validateOrderCreate from "../middlewares/orderCreate.middleware";
import checkLogin from "../middlewares/checkLogin.middleware";

import { createOrder, getUserOrders } from "../controllers/order.controller";

const ordersRouter = Router();

// Crear una nueva compra
ordersRouter.post("/", checkLogin, validateOrderCreate, createOrder);

// Consultar las compras del usuario autenticado
ordersRouter.get("/", checkLogin, getUserOrders);

export default ordersRouter;
