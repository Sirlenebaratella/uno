/*
  Warnings:

  - You are about to drop the column `cargo` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Amostra" ALTER COLUMN "id" SET DEFAULT (concat('amo_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Analise" ALTER COLUMN "id" SET DEFAULT (concat('ana_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "SolicitacaoDeAnalise" ALTER COLUMN "id" SET DEFAULT (concat('sol_', gen_random_uuid()))::TEXT;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "cargo",
ADD COLUMN     "cargos" "Cargo"[],
ALTER COLUMN "id" SET DEFAULT (concat('usr_', gen_random_uuid()))::TEXT;
