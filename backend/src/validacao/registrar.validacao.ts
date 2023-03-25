import * as yup from 'yup';

export const registrarValidacao = yup.object({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    senha: yup.string().required().min(8),
    confirmarSenha: yup.string().required().oneOf([yup.ref('senha')], 'Senhas não conferem'),
    cargos: yup.array().of(yup.string().required()).required(),
})