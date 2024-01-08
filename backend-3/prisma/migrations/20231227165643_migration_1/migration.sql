-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL DEFAULT 'Ceci est la quote',
    "author" TEXT NOT NULL DEFAULT 'Toto',
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);
