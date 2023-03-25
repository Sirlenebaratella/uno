import express from 'express';
import autenticacao from './autenticacao.router';

const router = express.Router();

export default (): express.Router => {
    autenticacao(router)
    return router;
}