import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

  const GITHUB_OWNER = 'meu-saldo';
  const GITHUB_REPO = 'meu-saldo-backend';
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

function App() {

  const [milestones, setMilestones] = useState([]);
  const [issues, setIssues] = useState({});
  
  useEffect(() => {
    fetchMilestones();
  }, []);

  const fetchMilestones = async () => {
    const headers = GITHUB_TOKEN
      ? { Authorization: `token ${GITHUB_TOKEN}` }
      : {};
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/milestones`,
        { headers }
      );
      const milestonesData = response.data;
      setMilestones(milestonesData);

      milestonesData.forEach((milestone) => {
        fetchIssuesByMilestone(milestone.number, headers);
      });
    } catch (error) {
      console.error('Erro ao buscar milestones:', error);
    }
  };

  const fetchIssuesByMilestone = async (milestoneNumber, headers) => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,
        {
          headers,
          params: {
            milestone: milestoneNumber,
            state: 'open',
          },
        }
      );

      const onlyIssues = response.data.filter(
        (item) => !item.pull_request
      );

      setIssues((prev) => ({
        ...prev,
        [milestoneNumber]: onlyIssues,
      }));
    } catch (error) {
      console.error(
        `Erro ao buscar issues da milestone ${milestoneNumber}:`,
        error
      );
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl mb-6">🚀 Meu Saldo - Em Breve</h1>

      {milestones.map((milestone) => (
        <div key={milestone.id} className="mb-8">
          <h2 className="text-2xl font-bold mb-2">{milestone.title}</h2>
          <p className="mb-2">{milestone.description}</p>
          <div className="mb-2">
            🔓 {milestone.open_issues} abertas | 🔒 {milestone.closed_issues}{' '}
            fechadas
          </div>

          <ul className="list-disc ml-6">
            {issues[milestone.number]?.length > 0 ? (
              issues[milestone.number].map((issue) => (
                <li key={issue.id}>
                  <a
                    href={issue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    #{issue.number} - {issue.title}
                  </a>
                </li>
              ))
            ) : (
              <li>Carregando...</li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App
