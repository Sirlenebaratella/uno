import * as yup from "yup";

export const loginValidacao = yup.object({
  email: yup
    .string()
    .email("Email inválido")
    .required("Email é um campo obrigatório"),
  senha: yup
    .string()
    .required("Senha é um campo obrigatório")
    .min(8, "Senha deve ter no mínimo 8 caracteres"),
});
