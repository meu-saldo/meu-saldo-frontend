import axios from "axios";
import { useEffect, useState } from "react";

export function useGitHubRoadmap() {
  const [milestones, setMilestones] = useState([]);
  const [issues, setIssues] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        setError("Usuário não autenticado. Faça o login novamente.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/github/roadmap`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = response.data;
        
        setMilestones(data.milestones);
        setIssues(data.issues);

      } catch (err) {
        if (err.response) {
          console.error("Data:", err.response.data);
          console.error("Status", err.response.status);
          setError(`Erro ${err.response.status}: ${err.response.message || 'Erro ao buscar dados'}`);
        } else if (err.request) {
          setError("Erro de rede. Verifique sua conexão ou a configuração de CORS.")
        } else {
          setError(err.message || "Erro desconhecido");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  return { milestones, issues, loading, error };
}
