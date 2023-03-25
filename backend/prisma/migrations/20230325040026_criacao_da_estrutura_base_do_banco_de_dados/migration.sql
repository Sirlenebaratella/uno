-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('ADMIN', 'ANALISTA', 'VENDEDOR', 'EXPEDICAO');

-- CreateEnum
CREATE TYPE "StatusSolicitacaoDeAnalise" AS ENUM ('Pendente', 'EmAnalise', 'Concluida', 'Cancelada');

-- CreateEnum
CREATE TYPE "StatusAnalise" AS ENUM ('Pendente', 'EmAnalise', 'Concluida');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL DEFAULT (concat('usr_', gen_random_uuid()))::TEXT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "cargo" "Cargo"[],

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitante" (
    "cnpj" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Solicitante_pkey" PRIMARY KEY ("cnpj")
);

-- CreateTable
CREATE TABLE "SolicitacaoDeAnalise" (
    "id" TEXT NOT NULL DEFAULT (concat('sol_', gen_random_uuid()))::TEXT,
    "tipoDeAnalise" TEXT NOT NULL,
    "consideracoesGerais" TEXT NOT NULL,
    "informacoesAdicionais" TEXT,
    "dataDeSolicitacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "StatusSolicitacaoDeAnalise" NOT NULL DEFAULT 'Pendente',
    "solicitanteCnpj" TEXT NOT NULL,

    CONSTRAINT "SolicitacaoDeAnalise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amostra" (
    "id" TEXT NOT NULL DEFAULT (concat('amo_', gen_random_uuid()))::TEXT,
    "nomeAmosrtra" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "notaFiscal" TEXT NOT NULL,
    "validade" TIMESTAMP(3) NOT NULL,
    "dataDeRecebimento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "solicitacaoDeAnaliseId" TEXT NOT NULL,

    CONSTRAINT "Amostra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Analise" (
    "id" TEXT NOT NULL DEFAULT (concat('ana_', gen_random_uuid()))::TEXT,
    "nomeAnalise" TEXT NOT NULL,
    "especificacao" TEXT NOT NULL,
    "dataDeAnalise" TIMESTAMP(3),
    "status" "StatusAnalise" NOT NULL DEFAULT 'Pendente',
    "amostraId" TEXT NOT NULL,
    "resultado" TEXT,

    CONSTRAINT "Analise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Solicitante_nome_key" ON "Solicitante"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Solicitante_telefone_key" ON "Solicitante"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Solicitante_email_key" ON "Solicitante"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Amostra_notaFiscal_key" ON "Amostra"("notaFiscal");

-- AddForeignKey
ALTER TABLE "SolicitacaoDeAnalise" ADD CONSTRAINT "SolicitacaoDeAnalise_solicitanteCnpj_fkey" FOREIGN KEY ("solicitanteCnpj") REFERENCES "Solicitante"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Amostra" ADD CONSTRAINT "Amostra_solicitacaoDeAnaliseId_fkey" FOREIGN KEY ("solicitacaoDeAnaliseId") REFERENCES "SolicitacaoDeAnalise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Analise" ADD CONSTRAINT "Analise_amostraId_fkey" FOREIGN KEY ("amostraId") REFERENCES "Amostra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
