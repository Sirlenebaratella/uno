import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

export const isLoggedIn = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ erro: "Usuário não logado!" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err) => {
    if (err) {
      return res.status(401).json({ erro: "Usuário não logado!" });
    }

    next();
  });
};
