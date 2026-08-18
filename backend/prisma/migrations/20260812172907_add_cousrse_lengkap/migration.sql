-- CreateTable
CREATE TABLE `roles` (
    `id` VARCHAR(36) NOT NULL,
    `nama_role` VARCHAR(50) NOT NULL,
    `deskripsi` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(36) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role_id` VARCHAR(36) NOT NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `last_login` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    INDEX `users_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_sessions` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `token_jwt` TEXT NOT NULL,
    `device_id` VARCHAR(255) NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_agent` TEXT NULL,
    `last_active` DATETIME(3) NULL,
    `expired_at` DATETIME(3) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otps` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `otp_code` VARCHAR(10) NOT NULL,
    `purpose` ENUM('register', 'reset') NOT NULL,
    `expired_at` DATETIME(3) NOT NULL,
    `is_used` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profil_tentor` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `nik` VARCHAR(16) NOT NULL,
    `nama_lengkap` VARCHAR(150) NOT NULL,
    `jenis_kelamin` ENUM('L', 'P') NOT NULL,
    `no_wa` VARCHAR(20) NOT NULL,
    `alamat_domisili` TEXT NULL,
    `maps_place_id` VARCHAR(255) NULL,
    `latitude` DECIMAL(10, 8) NULL,
    `longitude` DECIMAL(11, 8) NULL,
    `pendidikan_terakhir` VARCHAR(100) NULL,
    `file_cv` VARCHAR(255) NULL,
    `file_ijazah` VARCHAR(255) NULL,
    `status_akun` ENUM('Pending', 'Approved', 'Suspended') NOT NULL DEFAULT 'Pending',
    `tanggal_bergabung` DATE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `profil_tentor_user_id_key`(`user_id`),
    UNIQUE INDEX `profil_tentor_nik_key`(`nik`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profil_ortu` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `nama_wali` VARCHAR(150) NOT NULL,
    `no_wa` VARCHAR(20) NOT NULL,
    `alamat_rumah` TEXT NULL,
    `maps_place_id` VARCHAR(255) NULL,
    `latitude` DECIMAL(10, 8) NULL,
    `longitude` DECIMAL(11, 8) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `profil_ortu_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `profil_siswa` (
    `id` VARCHAR(36) NOT NULL,
    `ortu_id` VARCHAR(36) NOT NULL,
    `nama_siswa` VARCHAR(150) NOT NULL,
    `jenis_kelamin` ENUM('L', 'P') NOT NULL,
    `asal_sekolah` VARCHAR(150) NULL,
    `jenjang` ENUM('Pra-Sekolah', 'SD', 'SMP', 'SMA', 'Umum') NOT NULL,
    `kelas` VARCHAR(20) NULL,
    `catatan_khusus` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mata_pelajaran` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_mapel` VARCHAR(100) NOT NULL,
    `jenjang` ENUM('Pra-Sekolah', 'SD', 'SMP', 'SMA', 'Umum') NOT NULL,
    `deskripsi` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tentor_mapel` (
    `id` VARCHAR(36) NOT NULL,
    `tentor_id` VARCHAR(36) NOT NULL,
    `mapel_id` INTEGER NOT NULL,
    `tingkat_keahlian` ENUM('Basic', 'Intermediate', 'Expert') NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `paket_les` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_paket` VARCHAR(100) NOT NULL,
    `deskripsi` TEXT NULL,
    `harga_dasar_ortu` DECIMAL(12, 2) NOT NULL,
    `honor_dasar_tentor` DECIMAL(12, 2) NOT NULL,
    `durasi_menit` INTEGER NOT NULL,
    `minimal_sesi` INTEGER NOT NULL DEFAULT 1,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengaturan_sistem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kunci` VARCHAR(100) NOT NULL,
    `nilai` VARCHAR(250) NULL,
    `tipe` ENUM('String', 'Integer', 'Decimal', 'Boolean', 'JSON') NOT NULL,
    `deskripsi` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `pengaturan_sistem_kunci_key`(`kunci`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ketersediaan_tentor` (
    `id` VARCHAR(36) NOT NULL,
    `tentor_id` VARCHAR(36) NOT NULL,
    `hari` ENUM('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu') NOT NULL,
    `jam_mulai` TIME NOT NULL,
    `jam_selesai` TIME NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kontrak_les` (
    `id` VARCHAR(36) NOT NULL,
    `siswa_id` VARCHAR(36) NOT NULL,
    `tentor_id` VARCHAR(36) NOT NULL,
    `mapel_id` INTEGER NOT NULL,
    `paket_id` INTEGER NOT NULL,
    `hari_rutin` ENUM('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu') NOT NULL,
    `jam_mulai` TIME NOT NULL,
    `jam_selesai` TIME NOT NULL,
    `jarak_km` DECIMAL(5, 2) NOT NULL,
    `biaya_sesi_ortu` DECIMAL(12, 2) NOT NULL,
    `honor_sesi_tentor` DECIMAL(12, 2) NOT NULL,
    `biaya_transport` DECIMAL(12, 2) NOT NULL,
    `catatan` TEXT NULL,
    `status_kontrak` ENUM('Aktif', 'Cuti', 'Selesai', 'Dibatalkan') NOT NULL DEFAULT 'Aktif',
    `tanggal_mulai` DATE NOT NULL,
    `tanggal_selesai` DATE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sesi_kbm` (
    `id` VARCHAR(36) NOT NULL,
    `kontrak_id` VARCHAR(36) NOT NULL,
    `tanggal_sesi` DATE NOT NULL,
    `jam_mulai_plan` TIME NOT NULL,
    `jam_selesai_plan` TIME NOT NULL,
    `status_sesi` ENUM('Scheduled', 'Rescheduled', 'Ongoing', 'Done', 'Canceled') NOT NULL DEFAULT 'Scheduled',
    `alasan_reschedule` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `presensi` (
    `id` VARCHAR(36) NOT NULL,
    `sesi_id` VARCHAR(36) NOT NULL,
    `waktu_checkin` DATETIME(3) NULL,
    `lat_checkin` DECIMAL(10, 8) NULL,
    `long_checkin` DECIMAL(11, 8) NULL,
    `jarak_meter_in` INTEGER NULL,
    `is_valid_geo_in` BOOLEAN NULL,
    `mock_loc_in` BOOLEAN NULL,
    `foto_checkin` VARCHAR(255) NULL,
    `waktu_checkout` DATETIME(3) NULL,
    `lat_checkout` DECIMAL(10, 8) NULL,
    `long_checkout` DECIMAL(11, 8) NULL,
    `mock_loc_out` BOOLEAN NULL,
    `foto_checkout` VARCHAR(255) NULL,
    `device_id` VARCHAR(255) NULL,
    `ip_address` VARCHAR(45) NULL,
    `status_hadir` ENUM('Hadir', 'Izin', 'Sakit', 'Alpa') NOT NULL,
    `keterangan` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `presensi_sesi_id_key`(`sesi_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `laporan_belajar` (
    `id` VARCHAR(36) NOT NULL,
    `sesi_id` VARCHAR(36) NOT NULL,
    `materi` VARCHAR(255) NOT NULL,
    `sub_materi` VARCHAR(255) NULL,
    `kendala_siswa` TEXT NULL,
    `pr_diberikan` TEXT NULL,
    `nilai_harian` INTEGER NULL,
    `catatan_tentor` TEXT NULL,
    `is_read_by_ortu` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `laporan_belajar_sesi_id_key`(`sesi_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rating_tentor` (
    `id` VARCHAR(36) NOT NULL,
    `sesi_id` VARCHAR(36) NOT NULL,
    `ortu_id` VARCHAR(36) NOT NULL,
    `skor_bintang` INTEGER NOT NULL,
    `ulasan_teks` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tagihan_ortu` (
    `id` VARCHAR(36) NOT NULL,
    `ortu_id` VARCHAR(36) NOT NULL,
    `no_invoice` VARCHAR(50) NOT NULL,
    `periode_bulan` VARCHAR(20) NOT NULL,
    `total_sesi` INTEGER NOT NULL,
    `total_tagihan` DECIMAL(12, 2) NOT NULL,
    `status_bayar` ENUM('Unpaid', 'Partial', 'Paid') NOT NULL DEFAULT 'Unpaid',
    `jatuh_tempo` DATE NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `tagihan_ortu_no_invoice_key`(`no_invoice`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_tagihan` (
    `id` VARCHAR(36) NOT NULL,
    `tagihan_id` VARCHAR(36) NOT NULL,
    `sesi_id` VARCHAR(36) NOT NULL,
    `nominal_sesi` DECIMAL(12, 2) NOT NULL,
    `nominal_transport` DECIMAL(12, 2) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `item_tagihan` (
    `id` VARCHAR(36) NOT NULL,
    `tagihan_id` VARCHAR(36) NOT NULL,
    `nama_item` VARCHAR(255) NOT NULL,
    `tipe_item` ENUM('Penambahan', 'Potongan') NOT NULL,
    `nominal` DECIMAL(12, 2) NOT NULL,
    `keterangan` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pembayaran` (
    `id` VARCHAR(36) NOT NULL,
    `tagihan_id` VARCHAR(36) NOT NULL,
    `tanggal_bayar` DATETIME(3) NOT NULL,
    `metode_bayar` ENUM('Transfer', 'QRIS', 'Cash') NOT NULL,
    `referensi_gateway` VARCHAR(255) NULL,
    `nominal_bayar` DECIMAL(12, 2) NULL,
    `bukti_struk` VARCHAR(255) NOT NULL,
    `status_validasi` ENUM('Pending', 'Valid', 'Invalid') NOT NULL DEFAULT 'Pending',
    `catatan_admin` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gaji_tentor` (
    `id` VARCHAR(36) NOT NULL,
    `tentor_id` VARCHAR(36) NOT NULL,
    `periode_bulan` VARCHAR(20) NOT NULL,
    `total_honor_ajar` DECIMAL(12, 2) NOT NULL,
    `total_transport` DECIMAL(12, 2) NOT NULL,
    `bonus_tambahan` DECIMAL(12, 2) NOT NULL,
    `potongan_denda` DECIMAL(12, 2) NOT NULL,
    `total_terima` DECIMAL(12, 2) NOT NULL,
    `status_gaji` ENUM('Draft', 'Approved', 'Transferred') NOT NULL DEFAULT 'Draft',
    `tanggal_transfer` DATETIME(3) NULL,
    `metode_transfer` VARCHAR(100) NULL,
    `file_slip` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `modul` VARCHAR(100) NOT NULL,
    `aksi` ENUM('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT') NOT NULL,
    `payload_lama` JSON NULL,
    `payload_baru` JSON NULL,
    `ip_address` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifikasi` (
    `id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `judul` VARCHAR(150) NOT NULL,
    `pesan` TEXT NOT NULL,
    `tipe_notif` VARCHAR(50) NOT NULL,
    `data_referensi` JSON NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_sessions` ADD CONSTRAINT `user_sessions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `otps` ADD CONSTRAINT `otps_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profil_tentor` ADD CONSTRAINT `profil_tentor_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profil_ortu` ADD CONSTRAINT `profil_ortu_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profil_siswa` ADD CONSTRAINT `profil_siswa_ortu_id_fkey` FOREIGN KEY (`ortu_id`) REFERENCES `profil_ortu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tentor_mapel` ADD CONSTRAINT `tentor_mapel_tentor_id_fkey` FOREIGN KEY (`tentor_id`) REFERENCES `profil_tentor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tentor_mapel` ADD CONSTRAINT `tentor_mapel_mapel_id_fkey` FOREIGN KEY (`mapel_id`) REFERENCES `mata_pelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ketersediaan_tentor` ADD CONSTRAINT `ketersediaan_tentor_tentor_id_fkey` FOREIGN KEY (`tentor_id`) REFERENCES `profil_tentor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kontrak_les` ADD CONSTRAINT `kontrak_les_siswa_id_fkey` FOREIGN KEY (`siswa_id`) REFERENCES `profil_siswa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kontrak_les` ADD CONSTRAINT `kontrak_les_tentor_id_fkey` FOREIGN KEY (`tentor_id`) REFERENCES `profil_tentor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kontrak_les` ADD CONSTRAINT `kontrak_les_mapel_id_fkey` FOREIGN KEY (`mapel_id`) REFERENCES `mata_pelajaran`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kontrak_les` ADD CONSTRAINT `kontrak_les_paket_id_fkey` FOREIGN KEY (`paket_id`) REFERENCES `paket_les`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sesi_kbm` ADD CONSTRAINT `sesi_kbm_kontrak_id_fkey` FOREIGN KEY (`kontrak_id`) REFERENCES `kontrak_les`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `presensi` ADD CONSTRAINT `presensi_sesi_id_fkey` FOREIGN KEY (`sesi_id`) REFERENCES `sesi_kbm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `laporan_belajar` ADD CONSTRAINT `laporan_belajar_sesi_id_fkey` FOREIGN KEY (`sesi_id`) REFERENCES `sesi_kbm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating_tentor` ADD CONSTRAINT `rating_tentor_sesi_id_fkey` FOREIGN KEY (`sesi_id`) REFERENCES `sesi_kbm`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rating_tentor` ADD CONSTRAINT `rating_tentor_ortu_id_fkey` FOREIGN KEY (`ortu_id`) REFERENCES `profil_ortu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tagihan_ortu` ADD CONSTRAINT `tagihan_ortu_ortu_id_fkey` FOREIGN KEY (`ortu_id`) REFERENCES `profil_ortu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_tagihan` ADD CONSTRAINT `detail_tagihan_tagihan_id_fkey` FOREIGN KEY (`tagihan_id`) REFERENCES `tagihan_ortu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detail_tagihan` ADD CONSTRAINT `detail_tagihan_sesi_id_fkey` FOREIGN KEY (`sesi_id`) REFERENCES `sesi_kbm`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `item_tagihan` ADD CONSTRAINT `item_tagihan_tagihan_id_fkey` FOREIGN KEY (`tagihan_id`) REFERENCES `tagihan_ortu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pembayaran` ADD CONSTRAINT `pembayaran_tagihan_id_fkey` FOREIGN KEY (`tagihan_id`) REFERENCES `tagihan_ortu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gaji_tentor` ADD CONSTRAINT `gaji_tentor_tentor_id_fkey` FOREIGN KEY (`tentor_id`) REFERENCES `profil_tentor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifikasi` ADD CONSTRAINT `notifikasi_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
