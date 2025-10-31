-- CreateTable: Status
CREATE TABLE "Status" (
  "id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Status_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Status_name_key" UNIQUE ("name")
);

CREATE TABLE "Role" (
  "id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Role_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "Role_name_key" UNIQUE ("name")
);

-- CreateTable: User
CREATE TABLE "User" (
  "id" SERIAL NOT NULL,
  "name" TEXT NOT NULL,
  "lastname" TEXT,
  "email" TEXT NOT NULL,
  "id_status" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "User_email_key" UNIQUE ("email"),
  CONSTRAINT "User_id_status_fkey"
    FOREIGN KEY ("id_status") REFERENCES "Status"("id")
    ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Índice útil para filtrar por estado
CREATE INDEX "User_id_status_idx" ON "User"("id_status");
