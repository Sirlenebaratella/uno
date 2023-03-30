import express from 'express';
import autenticacao from './autenticacao.router';
import usuarios from './usuarios.router';
import solicitantes from './solicitantes.router'


const router = express.Router();

export default (): express.Router => {
    autenticacao(router)
    usuarios(router)
    solicitantes(router)
    return router;
}