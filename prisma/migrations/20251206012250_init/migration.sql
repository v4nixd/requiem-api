-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Log" (
    "id" BIGSERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT,
    "guildId" TEXT,
    "data" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Log_userId_idx" ON "Log"("userId");

-- CreateIndex
CREATE INDEX "Log_guildId_idx" ON "Log"("guildId");

-- CreateIndex
CREATE INDEX "Log_createdAt_idx" ON "Log"("createdAt");
