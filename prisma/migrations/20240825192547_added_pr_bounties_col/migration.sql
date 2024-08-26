-- CreateTable
CREATE TABLE "PrBounties" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "bountyAmount" TEXT NOT NULL,
    "prNumber" TEXT NOT NULL,
    "prLink" TEXT NOT NULL,
    "winnerSub" TEXT NOT NULL,
    "walletPrivateKey" TEXT NOT NULL,

    CONSTRAINT "PrBounties_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PrBounties_token_key" ON "PrBounties"("token");

-- AddForeignKey
ALTER TABLE "PrBounties" ADD CONSTRAINT "PrBounties_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
