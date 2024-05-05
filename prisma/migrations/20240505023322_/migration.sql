-- CreateTable
CREATE TABLE "GameLeaderboardEntry" (
    "id" TEXT NOT NULL,
    "turns" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameLeaderboardEntry_pkey" PRIMARY KEY ("id")
);
