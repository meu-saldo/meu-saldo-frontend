import { useEffect, useState } from "react";

export function useGitHubRoadmap() {
  const [milestones, setMilestones] = useState([]);
  const [issues, setIssues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/github/roadmap`); // ou URL completa do backend
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMilestones(data.milestones);
        setIssues(data.issues);
      } catch (err) {
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  return { milestones, issues, loading, error };
}
