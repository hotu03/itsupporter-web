import { useState, useEffect } from "react";
import { getMachines, saveMachines, type Machine } from "../../../data/machines";

export function useMachines() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"all" | "online" | "in-person">("all");
  const [gridView, setGridView] = useState(true);

  // Load machines on mount
  useEffect(() => {
    const loaded = getMachines();
    setMachines(loaded);
    setLoading(false);
  }, []);

  // Filter machines based on search and view mode
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

  // Approve machine (for online registrations)
  const approveMachine = (id: number) => {
    setMachines((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, isApproved: true } : m
      )
    );
    const updatedMachines = machines.map((m) =>
      m.id === id ? { ...m, isApproved: true } : m
    );
    saveMachines(updatedMachines);
  };

  // Refresh machines (reload from storage)
  const refreshMachines = () => {
    setLoading(true);
    const loaded = getMachines();
    setMachines(loaded);
    setLoading(false);
  };

  return {
    machines,
    filtered,
    loading,
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
