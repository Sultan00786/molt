/*
  Warnings:

  - Added the required column `content` to the `File_Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `step` to the `File_Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Step" AS ENUM ('plan', 'generate_file', 'observe', 'verify', 'error', 'output');

-- AlterTable
ALTER TABLE "File_Message" ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "step" "Step" NOT NULL;
