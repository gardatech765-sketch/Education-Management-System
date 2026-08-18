/*
  Warnings:

  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Package` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParentProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeachingReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TutorProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_scheduleId_fkey`;

-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_tutorId_fkey`;

-- DropForeignKey
ALTER TABLE `ParentProfile` DROP FOREIGN KEY `ParentProfile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `Schedule` DROP FOREIGN KEY `Schedule_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `Schedule` DROP FOREIGN KEY `Schedule_packageId_fkey`;

-- DropForeignKey
ALTER TABLE `Schedule` DROP FOREIGN KEY `Schedule_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `Schedule` DROP FOREIGN KEY `Schedule_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `Schedule` DROP FOREIGN KEY `Schedule_tutorId_fkey`;

-- DropForeignKey
ALTER TABLE `StudentProfile` DROP FOREIGN KEY `StudentProfile_parentId_fkey`;

-- DropForeignKey
ALTER TABLE `StudentProfile` DROP FOREIGN KEY `StudentProfile_userId_fkey`;

-- DropForeignKey
ALTER TABLE `StudentProgress` DROP FOREIGN KEY `StudentProgress_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `TeachingReport` DROP FOREIGN KEY `TeachingReport_scheduleId_fkey`;

-- DropForeignKey
ALTER TABLE `TeachingReport` DROP FOREIGN KEY `TeachingReport_tutorId_fkey`;

-- DropForeignKey
ALTER TABLE `TutorProfile` DROP FOREIGN KEY `TutorProfile_userId_fkey`;

-- DropTable
DROP TABLE `Attendance`;

-- DropTable
DROP TABLE `Package`;

-- DropTable
DROP TABLE `ParentProfile`;

-- DropTable
DROP TABLE `Payment`;

-- DropTable
DROP TABLE `Schedule`;

-- DropTable
DROP TABLE `StudentProfile`;

-- DropTable
DROP TABLE `StudentProgress`;

-- DropTable
DROP TABLE `Subject`;

-- DropTable
DROP TABLE `TeachingReport`;

-- DropTable
DROP TABLE `TutorProfile`;

-- DropTable
DROP TABLE `User`;
