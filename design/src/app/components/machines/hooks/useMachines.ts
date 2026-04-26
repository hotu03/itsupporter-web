import { useState, useEffect } from "react";
import { getMachines, updateMachine, type Machine } from "../../../data/machines";

export function useMachines() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"all" | "online" | "in-person">("all");
  const [gridView, setGridView] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadMachines = async () => {
      try {
        const loaded = await getMachines();
        if (!isMounted) return;
        setMachines(loaded);
        setError(null);
      } catch {
        if (!isMounted) return;
        setError("Không thể tải danh sách máy");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void loadMachines();

    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = machines.filter((m) => {
    const matchesSearch =
      searchQuery === "" ||
      m.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesView =
      viewMode === "all" ||
      (viewMode === "online" && m.registrationType === "online") ||
      (viewMode === "in-person" && m.registrationType !== "online");

    return matchesSearch && matchesView;
  });

  const approveMachine = async (id: string | number) => {
    let previousApproval: boolean | undefined;
    setError(null);
    setMachines((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        previousApproval = m.isApproved;
        return { ...m, isApproved: true };
      }),
    );

    try {
      await updateMachine(id, { isApproved: true });
    } catch {
      setMachines((prev) =>
        prev.map((m) => (m.id === id ? { ...m, isApproved: previousApproval } : m)),
      );
      setError("Không thể duyệt máy");
    }
  };

  const refreshMachines = async () => {
    setLoading(true);
    setError(null);
    try {
      const loaded = await getMachines();
      setMachines(loaded);
    } catch {
      setError("Không thể tải danh sách máy");
    } finally {
      setLoading(false);
    }
  };

  return {
    machines,
    filtered,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    gridView,
    setGridView,
    approveMachine,
    refreshMachines,
  };
}
