import * as yup from 'yup'

export const cadastrarSolicitanteValidacao = yup.object({
    cnpj: yup.string().required("CNPJ é um campo obrigatório!").length(14, "CNPJ inválido!"),
    nome: yup.string().required("Nome é um campo obrigatório!"),
    cep: yup.string().required("CEP é um campo obrigatório!").length(8, "CEP inválido!"),
    endereco: yup.string().required("Endereço é um campo obrigatório"),
    cidade: yup.string().required("Cidade é um campo obrigatório!"),
    estado: yup.string().required("Estado é um campo obrigatório"),
    telefone: yup.string().required("Telefone é um campo obrigatório").length(13, "Telefone inválido!"),
    email: yup.string().required("Email é um campo obrigatório!").email("Email inválido!"),
})