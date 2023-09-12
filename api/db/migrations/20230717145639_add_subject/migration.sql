/*
  Warnings:

  - Added the required column `subject` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Email" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "resendId" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "subject" TEXT NOT NULL
);
INSERT INTO "new_Email" ("createdAt", "from", "id", "resendId", "to", "updatedAt") SELECT "createdAt", "from", "id", "resendId", "to", "updatedAt" FROM "Email";
DROP TABLE "Email";
ALTER TABLE "new_Email" RENAME TO "Email";
CREATE UNIQUE INDEX "Email_resendId_key" ON "Email"("resendId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
