import { Wrench } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar */}
      <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100 px-8 py-4">
        <h1 className="text-gray-900" style={{ fontSize: "1.25rem", fontWeight: 700 }}>{title}</h1>
        <p className="text-gray-400 text-xs mt-0.5">{description ?? `Manage your ${title.toLowerCase()}`}</p>
      </header>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Wrench size={28} className="text-orange-400" />
          </div>
          <p className="text-gray-700" style={{ fontWeight: 600 }}>Coming Soon</p>
          <p className="text-gray-400 text-sm mt-1">This page is under construction.</p>
        </div>
      </div>
    </div>
  );
}
