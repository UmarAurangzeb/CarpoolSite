-- CreateTable
CREATE TABLE "Carowner" (
    "id" TEXT NOT NULL,
    "OwnerEmail" TEXT NOT NULL,
    "AccessType" TEXT NOT NULL,
    "BriefDescription" TEXT,
    "OwnerName" TEXT NOT NULL,
    "carname" TEXT NOT NULL,
    "monthlycharges" INTEGER DEFAULT 0,
    "completeRoute" TEXT NOT NULL,
    "WhatsApp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Carowner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verificationtoken" TEXT NOT NULL,
    "tokenexpiry" TIMESTAMP(3) NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Carowner" ADD CONSTRAINT "Carowner_OwnerEmail_fkey" FOREIGN KEY ("OwnerEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
