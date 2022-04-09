/*
  Warnings:

  - The primary key for the `games` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `games` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[secure_id]` on the table `games` will be added. If there are existing duplicate values, this will fail.
  - The required column `secure_id` was added to the `games` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "games" DROP CONSTRAINT "games_pkey",
ADD COLUMN     "secure_id" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "games_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "games_secure_id_key" ON "games"("secure_id");
