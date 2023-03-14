/*
  Warnings:

  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `author` to the `Post` table without a default value. This is not possible if the table is not empty.

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
    "html" TEXT,
    "icon" TEXT,
    "cover" TEXT,
    "createdAt" TEXT NOT NULL,
    "expiresAt" TEXT NOT NULL
);
INSERT INTO "new_Post" ("cover", "createdAt", "expiresAt", "html", "icon", "id", "slug", "tags", "title", "url") SELECT "cover", "createdAt", "expiresAt", "html", "icon", "id", "slug", "tags", "title", "url" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE UNIQUE INDEX "Post_id_key" ON "Post"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
