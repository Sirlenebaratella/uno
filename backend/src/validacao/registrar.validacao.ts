import * as yup from 'yup';

export const registrarValidacao = yup.object({
    nome: yup.string().required("Nome é um campo obrigatório"),
    email: yup.string().email("Email inválido").required("Email é um campo obrigatório"),
    senha: yup.string().required("Senha é um campo obrigatório").min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmarSenha: yup.string().required("Confirmar Senha é um campo obrigatório").oneOf([yup.ref('senha')], 'Senhas não conferem'),
    cargos: yup.array().of(yup.string().required()).required("Cargos é um campo obrigatório"),
})