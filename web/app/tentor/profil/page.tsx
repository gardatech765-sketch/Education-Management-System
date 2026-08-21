import BiodataSection from "@/components/tentor/profil/BiodataSection";
import DokumenWajibSection from "@/components/tentor/profil/DokumenWajibSection";

export default function ProfilSayaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900">Profil Saya</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Kelola biodata, rekening penggajian, dan dokumen wajib Anda.
        </p>
      </div>

      <BiodataSection />
      <DokumenWajibSection />
    </div>
  );
}
