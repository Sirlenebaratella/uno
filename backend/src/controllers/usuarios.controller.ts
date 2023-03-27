import { prisma } from "../db/prisma";
import bcrypt from "bcrypt";
import express from "express";
import * as yup from "yup";

export const atualizarDados = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  const emailSchema = yup.object().shape({
    email: yup.string().email("Email Inválido!"),
  });

  const senhaSchema = yup.object().shape({
    senha: yup.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
  });

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
    });

    if (!usuario)
      return res.status(404).json({ erro: "Usuário não encontrado" });

    if (nome) usuario.nome = nome;
    if (email) {
      try {
        await emailSchema.validate(req.body);
        usuario.email = email;
      } catch (error) {
        return res.status(400).json(error);
      }
    }

    if (senha) {
      try {
        await senhaSchema.validate(req.body);
        usuario.senha = senha;
      } catch (error) {
        return res.status(400).json(error);
      }
    };

    const usuarioAtualizado = await prisma.usuario.update({
      where: { id },
      data: {
        nome: usuario.nome,
        email: usuario.email,
        senha: usuario.senha,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        senha: false,
        cargos: true,
      },
    });

    res.status(200).json(usuarioAtualizado);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
