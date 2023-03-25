import express from 'express';
import { registrar } from '../controllers/autenticacao.controller';

export default (router : express.Router) => {
    router.post('/auth/registrar', registrar);
}