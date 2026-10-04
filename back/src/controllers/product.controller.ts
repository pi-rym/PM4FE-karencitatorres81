import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import {
  getProductByIdService,
  getProductsService,
} from "../services/products.service";

export const getProducts = catchedController(
  async (req: Request, res: Response) => {
    const products = await getProductsService();
    res.json(products);
  },
);

export const getProductById = catchedController(
  async (req: Request, res: Response) => {
    const productId = Number(req.params.id);

    const product = await getProductByIdService(productId);

    if (!product) {
      res.status(404).json({
        message: "Producto no encontrado",
      });
      return;
    }

    res.json(product);
  },
);
