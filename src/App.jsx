import { useState, useEffect } from 'react';
import axios from 'axios';

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
            state: 'all',
          },
        }
      );

      const onlyIssues = response.data
        .filter((item) => !item.pull_request)
        .sort((a, b) => a.number - b.number);

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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-10 font-sans">
      <h1 className="text-4xl font-semibold text-center mb-14 tracking-tight">
        🚀 <span className="text-white/90">Meu Saldo</span> – Roadmap
      </h1>

      <div className="space-y-10">
        {milestones.map((milestone) => (
          <div
            key={milestone.id}
            className="bg-white/5 border border-white/10 shadow-xl backdrop-blur-md rounded-2xl p-6"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white">{milestone.title}</h2>
              {milestone.description && (
                <p className="text-sm text-neutral-400 mt-1">{milestone.description}</p>
              )}
              <div className="text-xs text-neutral-500 mt-2">
                🔓 {milestone.open_issues} abertas &nbsp;&nbsp;|&nbsp;&nbsp;
                🔒 {milestone.closed_issues} fechadas
              </div>
            </div>

            <ul className="divide-y divide-white/10">
              {issues[milestone.number]?.length > 0 ? (
                issues[milestone.number].map((issue) => (
                  <li
                    key={issue.id}
                    className="flex items-center justify-between py-3 text-sm group"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={issue.state === 'closed'}
                        readOnly
                        className="w-4 h-4 accent-green-500 rounded border border-neutral-700 bg-neutral-900"
                      />
                      <a
                        href={issue.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`transition-colors hover:text-white ${issue.state === 'closed'
                          ? 'text-neutral-500 line-through'
                          : 'text-neutral-200'
                          }`}
                      >
                        #{issue.number} – {issue.title}
                      </a>
                    </div>
                  </li>
                ))
              ) : (
                <li className="text-neutral-500 italic py-2">Carregando...</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
