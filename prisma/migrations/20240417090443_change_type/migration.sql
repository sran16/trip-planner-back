/*
  Warnings:

  - You are about to alter the column `itinerary` on the `planners` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.

*/
-- AlterTable
ALTER TABLE `planners` MODIFY `itinerary` JSON NULL;
