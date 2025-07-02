import axios from "axios";
import { useEffect, useState } from "react";

export function useGitHubRoadmap(owner, repo, token) {
    const [milestones, setMilestones] = useState([]);
    const [issues, setIssues] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const headers = token ? { Authorization: `token ${token}` } : {};

    useEffect(() => {
        const fetchData = async () => {
        console.log("Buscando roadmap")
        const headers = token ? { Authorization: `token ${token}` } : {};

    try {
      const milestonesResponse = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/milestones`, { headers }
      );

      const milestonesData = milestonesResponse.data;
      setMilestones(milestonesData);

      const issuesByMilestone = await Promise.all(
        milestonesData.map(async (milestone) => {
          const issuesResponse = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/issues`, {
              headers,
              params: {
                milestone: milestone.number,
                state: 'all',
              },
            }
          );
          
          const onlyIssues = issuesResponse.data
            .filter((item) => !item.pull_request)
            .sort((a, b) => a.number - b.number);

          return { milestonesNumber: milestone.number, issues: onlyIssues };
        })
      );

      const issuesMap = {};
      issuesByMilestone.forEach(({ milestonesNumber, issues }) => {
        issuesMap[milestonesNumber] = issues;
      });

      setIssues(issuesMap);
    } catch (err) {
      console.error("Error ao buscar roadmap do GitHub:", err);
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [owner, repo, token]);
    return { milestones, issues, loading, error }
}