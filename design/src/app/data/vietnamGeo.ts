import { useState, useEffect, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface Ward {
  code: number;
  name: string;
  codename: string;
  division_type: string;
}

export interface Province {
  code: number;
  name: string;
  codename: string;
  division_type: string;
  phone_code: number;
  wards: Ward[];
}

// ─── Constants ───────────────────────────────────────────────────────────────
const CACHE_KEY = "its_vn_geo_v2";
const API_URL = "https://provinces.open-api.vn/api/v2/?depth=2";

// ─── Cache helpers ───────────────────────────────────────────────────────────
let cachedProvinces: Province[] | null = null;

function saveToCache(data: Province[]): void {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
}

function loadFromCache(): Province[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Province[];
  } catch {
    return null;
  }
}

// ─── API Fetcher ─────────────────────────────────────────────────────────────
export async function fetchVietnamGeo(): Promise<Province[]> {
  if (cachedProvinces) return cachedProvinces;

  const cached = loadFromCache();
  if (cached) {
    cachedProvinces = cached;
    return cached;
  }

  const res = await fetch(API_URL);
  if (!res.ok) throw new Error(`VietnamGeo API error: ${res.status}`);
  const data: Province[] = await res.json();

  cachedProvinces = data;
  saveToCache(data);
  return data;
}

// ─── Utility functions ──────────────────────────────────────────────────────
export function extractProvinces(data: Province[]): { code: number; name: string }[] {
  return data.map((p) => ({ code: p.code, name: p.name }));
}

export function extractWards(province: Province): Ward[] {
  return province.wards ?? [];
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useVietnamGeo() {
  const [allData, setAllData] = useState<Province[]>([]);
  const [provinces, setProvinces] = useState<{ code: number; name: string }[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVietnamGeo()
      .then((data) => {
        setAllData(data);
        setProvinces(extractProvinces(data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("[VietnamGeo] Failed to load:", err);
        setError("Không thể tải dữ liệu địa lý. Vui lòng thử lại.");
        setLoading(false);
      });
  }, []);

  const selectProvince = useCallback((code: number) => {
    const province = allData.find((p) => p.code === code) ?? null;
    setSelectedProvince(province);
    setWards(province ? extractWards(province) : []);
  }, [allData]);

  const clearSelection = useCallback(() => {
    setSelectedProvince(null);
    setWards([]);
  }, []);

  return {
    provinces,
    selectedProvince,
    wards,
    loading,
    error,
    selectProvince,
    clearSelection,
    allData,
  };
}