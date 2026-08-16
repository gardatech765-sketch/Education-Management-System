"use client";

export default function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? "bg-amber-500" : "bg-zinc-200"
        }`}
      >
        {/* track: 44px wide, knob: 20px — padding 2px kiri/kanan */}
        {/* off → left: 2px, on → left: 44 - 20 - 2 = 22px */}
        <span
          className={`absolute top-[2px] h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
            checked ? "left-[22px]" : "left-[2px]"
          }`}
        />
      </button>
      {label && <span className="text-sm text-zinc-700">{label}</span>}
    </label>
  );
}
