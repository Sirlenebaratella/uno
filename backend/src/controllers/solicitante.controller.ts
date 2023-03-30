import express from "express";
import { prisma } from "../db/prisma";
import { cadastrarSolicitanteValidacao } from "../validacao/cadastrarSolicitante.validacao";

export const cadastrarSolicitante = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    await cadastrarSolicitanteValidacao.validate(req.body, {
      abortEarly: false,
    });

    const { cnpj, nome, cep, endereco, cidade, estado, telefone, email } =
      req.body;

    const solicitanteExistenteCnpj = await prisma.solicitante.findUnique({
      where: { cnpj },
    });

    const solicitanteExistenteNome = await prisma.solicitante.findUnique({
      where: { nome } 
    })

    if (solicitanteExistenteCnpj)
      return res.status(409).json({ erro: "CNPJ já cadastrado" });

    if (solicitanteExistenteNome)
      return res.status(409).json({ erro: "Nome já cadastrado" });

    const solicitante = await prisma.solicitante.create({
      data: {
        cnpj,
        nome,
        cep,
        endereco,
        cidade,
        estado,
        telefone,
        email,
      },
    });

    res.status(201).json(solicitante);
  } catch (err) {
    return res.status(400).json({ erro: err });
  }
};
