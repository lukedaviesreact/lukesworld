/*
  Warnings:

  - Added the required column `excerpt` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seoDescription` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seoTitle` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `createdAt` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "seoTitle" TEXT NOT NULL,
    "seoDescription" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "html" TEXT,
    "icon" TEXT,
    "cover" TEXT,
    "createdAt" TEXT NOT NULL,
    "expiresAt" TEXT
);
INSERT INTO "new_Post" ("author", "cover", "createdAt", "expiresAt", "html", "icon", "id", "slug", "tags", "title", "url") SELECT "author", "cover", "createdAt", "expiresAt", "html", "icon", "id", "slug", "tags", "title", "url" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
