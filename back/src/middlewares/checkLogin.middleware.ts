import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { ClientError } from "../utils/errors";
import { JWT_SECRET } from "../config/envs";

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  // Obtener el token enviado por el frontend
  const token = req.headers.authorization;

  if (!token) {
    return next(new ClientError("Token is required"));
  }

  try {
    // Verificar que el token sea válido
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
    };

    // Guardar el ID del usuario autenticado
    req.body.userId = decoded.userId;

    console.log("Token Check OK");

    // Continuar hacia el controlador
    return next();
  } catch (error) {
    // Detener la petición si el token es inválido
    return next(new ClientError("Invalid token"));
  }
};

export default checkLogin;
