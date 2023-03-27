import { prisma } from "../db/prisma";
import { registrarValidacao } from "../validacao/registrar.validacao";
import { loginValidacao } from "../validacao/login.validadacao";
import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const registrar = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await registrarValidacao.validate(req.body, { abortEarly: false });
    const { nome, email, senha, cargos } = req.body;

    const usuarioExistente = await prisma.usuario.findFirst({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(409).json({ erro: "Usuário já existe" });
    }

    const usuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: bcrypt.hashSync(senha, 10),
        cargos,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        senha: false,
        cargos: true,
      },
    });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    await loginValidacao.validate(req.body, { abortEarly: false });
    const { email, senha } = req.body;
    const usuario = await prisma.usuario.findFirst({
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
        senha: true,
        cargos: true,
      },
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    if (!bcrypt.compareSync(senha, usuario.senha)) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        usuario: usuario.nome,
        email: usuario.email,
        cargos: usuario.cargos,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      {
        expiresIn: "8h",
      }
    );

    res.status(200).json(token);
  } catch (error) {
    res.status(400).json(error);
  }
};
