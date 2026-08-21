"use client";

import { useState } from "react";
import { Camera, CheckCircle2, Loader2, MapPin, ShieldAlert, ShieldCheck } from "lucide-react";
import { sesiPresensiHariIni } from "./dummy";

type Step = "idle" | "locating" | "located" | "photo-taken" | "checked-in" | "checked-out";

export default function CheckInFlow() {
  const [step, setStep] = useState<Step>("idle");
  const [simulasiDiLuarRadius, setSimulasiDiLuarRadius] = useState(false);
  const [jarak, setJarak] = useState(0);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);

  const sesi = sesiPresensiHariIni;
  const diLuarRadius = jarak > sesi.radiusMeter;

  function mulaiDeteksiLokasi() {
    setStep("locating");
    window.setTimeout(() => {
      setJarak(simulasiDiLuarRadius ? 320 : 45);
      setStep("located");
    }, 1200);
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoName(file.name);
      setStep("photo-taken");
    }
  }

  function konfirmasiCheckIn() {
    setCheckInTime(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
    setStep("checked-in");
  }

  function konfirmasiCheckOut() {
    setCheckOutTime(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }));
    setStep("checked-out");
  }

  function resetDemo() {
    setStep("idle");
    setJarak(0);
    setPhotoName(null);
    setCheckInTime(null);
    setCheckOutTime(null);
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-zinc-900">Sesi Berjalan</h2>

      <div className="mt-3 rounded-lg border border-zinc-100 p-3.5">
        <span className="text-xs font-medium text-zinc-400">{sesi.waktu}</span>
        <p className="mt-0.5 text-base font-bold text-zinc-900">{sesi.judul}</p>
        <p className="text-sm text-zinc-500">{sesi.peserta}</p>
        <div className="mt-2 flex items-start gap-1.5 text-xs text-zinc-500">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-400" />
          <span>{sesi.lokasiDetail}</span>
        </div>
      </div>

      {/* Demo toggle */}
      {step === "idle" && (
        <label className="mt-4 flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-2.5 text-xs text-zinc-500">
          <input
            type="checkbox"
            checked={simulasiDiLuarRadius}
            onChange={(e) => setSimulasiDiLuarRadius(e.target.checked)}
            className="h-4 w-4 rounded border-zinc-300 text-amber-500 focus:ring-amber-400"
          />
          Simulasikan berada di luar radius lokasi (untuk demo validasi geofencing)
        </label>
      )}

      {/* Step: idle */}
      {step === "idle" && (
        <button
          type="button"
          onClick={mulaiDeteksiLokasi}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 text-sm font-semibold text-white hover:bg-amber-600"
        >
          <MapPin className="h-4 w-4" />
          Mulai Check-In
        </button>
      )}

      {/* Step: locating */}
      {step === "locating" && (
        <div className="mt-4 flex flex-col items-center gap-2 rounded-lg bg-zinc-50 py-6 text-sm text-zinc-500">
          <Loader2 className="h-5 w-5 animate-spin text-amber-500" />
          Mendeteksi lokasi & memeriksa validitas GPS...
        </div>
      )}

      {/* Step: located */}
      {(step === "located" || step === "photo-taken") && (
        <div className="mt-4 space-y-3">
          <div
            className={`flex items-start gap-2.5 rounded-lg p-3.5 text-sm ${
              diLuarRadius ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {diLuarRadius ? (
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            <div>
              <p className="font-medium">
                {diLuarRadius
                  ? "Anda berada di luar radius lokasi belajar"
                  : "Lokasi valid, GPS asli terverifikasi"}
              </p>
              <p className="mt-0.5 text-xs opacity-80">
                Jarak dari titik acuan: {jarak}m (radius maksimal {sesi.radiusMeter}m)
                {diLuarRadius && " — Check-in tetap bisa dilanjutkan dengan catatan Anomali untuk di-review Admin."}
              </p>
            </div>
          </div>

          <div>
            <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-zinc-200 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
              <Camera className="h-4 w-4" />
              {photoName ? "Ganti Foto Selfie" : "Ambil Foto Selfie"}
              <input
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                onChange={handlePhoto}
              />
            </label>
            {photoName && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-emerald-600">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Foto terpilih: {photoName}
              </p>
            )}
          </div>

          <button
            type="button"
            disabled={!photoName}
            onClick={konfirmasiCheckIn}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 py-3 text-sm font-semibold text-white hover:bg-amber-600 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
          >
            Konfirmasi Check-In
          </button>
        </div>
      )}

      {/* Step: checked-in */}
      {step === "checked-in" && (
        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-2.5 rounded-lg bg-emerald-50 p-3.5 text-sm text-emerald-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-medium">Check-In berhasil pukul {checkInTime}</p>
              <p className="mt-0.5 text-xs opacity-80">
                Selamat mengajar! Jangan lupa Check-Out setelah sesi selesai.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={konfirmasiCheckOut}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            Check-Out Sekarang
          </button>
        </div>
      )}

      {/* Step: checked-out */}
      {step === "checked-out" && (
        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-2.5 rounded-lg bg-zinc-50 p-3.5 text-sm text-zinc-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
            <div>
              <p className="font-medium">
                Sesi selesai — {checkInTime} s/d {checkOutTime}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                Anda akan diarahkan mengisi Laporan Belajar untuk sesi ini.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={resetDemo}
            className="w-full rounded-lg border border-zinc-200 py-2.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50"
          >
            Ulangi Demo
          </button>
        </div>
      )}
    </div>
  );
}
