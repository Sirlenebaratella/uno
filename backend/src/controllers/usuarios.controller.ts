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
        usuario.senha = bcrypt.hashSync(senha, 10);
      } catch (error) {
        return res.status(400).json(error);
      }
    }

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

export const adicionarCargo = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const { novoCargo } = req.body;

  const usuario = await prisma.usuario.findUnique({
    where: { id },
  });

  if (!usuario)
    return res.status(404).json({ message: "Usuário não encontrado!" });

  if (novoCargo) {
    if (usuario?.cargos.some((cargo) => cargo === novoCargo)) {
      return res.status(409).json({ message: "Usuário já possui este cargo!" });
    }

    usuario?.cargos.push(novoCargo);
  }

  const usuarioAtualizado = await prisma.usuario.update({
    where: { id },
    data: {
      cargos: usuario?.cargos,
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
};

export const removerCargo = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;
  const { removerCargo } = req.body;

  const usuario = await prisma.usuario.findUnique({
    where: { id },
  });

  if (!usuario)
    return res.status(404).json({ message: "Usuário não encontrado!" });

  if (usuario.cargos.length === 1)
    return res
      .status(400)
      .json({ message: "Todos usuários precisam ter pelo menos 1 cargo!" });

  usuario.cargos = usuario?.cargos.filter((cargo) => cargo !== removerCargo);
  console.log(usuario.cargos);

  const usuarioAtualizado = await prisma.usuario.update({
    where: { id },
    data: {
      cargos: usuario.cargos,
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
};

export const removerUsuario = async (
  req: express.Request,
  res: express.Response
) => {
  const { id } = req.params;

  await prisma.usuario
    .delete({
      where: { id },
    })
    .catch((err) => res.status(404).json("Usuário não encontrado!"));

  res.status(200).json({ message: "Usuário deletado!" });
};
