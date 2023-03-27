import express from 'express';
import { atualizarDados } from '../controllers/usuarios.controller';
import { isLoggedIn } from '../middlewares/isLoggedIn';
import { isOwner } from '../middlewares/isOwner';

export default (router: express.Router) => {
    router.patch('/usuarios/atualizar-dados/:id', isLoggedIn, isOwner, atualizarDados)
}