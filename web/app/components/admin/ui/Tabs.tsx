"use client";

export type TabItem = {
  key: string;
  label: string;
};

export default function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: TabItem[];
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex gap-1 border-b border-zinc-200">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
            active === tab.key ? "text-amber-600" : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          {tab.label}
          {active === tab.key && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-amber-500" />
          )}
        </button>
      ))}
    </div>
  );
}