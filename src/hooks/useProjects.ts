// src/hooks/useProjects.ts
import { useQuery } from "@tanstack/react-query";

const fetchProjects = async () => {
  const res = await fetch("/api/projects.json");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5,
  });
};
