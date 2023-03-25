import { prisma } from "../db/prisma";
import { registrarValidacao } from "../validacao/registrar.validacao";
import express from 'express';
import bcrypt from 'bcrypt';

export const registrar = async (req: express.Request , res: express.Response) => {
    try {
        await registrarValidacao.validate(req.body, { abortEarly: false });
        const { nome, email, senha, cargos } = req.body;

        const usuarioExistente = await prisma.usuario.findFirst({ 
            where: { email }
        });

        if (usuarioExistente) {
            return res.status(409).json({ erro: 'Usuário já existe' });
        }
        
        const usuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: bcrypt.hashSync(senha, 10),
                cargos
            },
            select: {
                id: true,
                nome: true,
                email: true,
                senha: false,
                cargos: true,
            }
        });
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json(error);
    }
}