import { useGitHubRoadmap } from '../hooks/useGitHubRoadmap';
import MilestoneCard from '../components/MilestoneCard';

const GITHUB_OWNER = 'meu-saldo';
const GITHUB_REPO = 'meu-saldo-backend';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

function EmBreve() {
    const { milestones, issues, loading, error } = useGitHubRoadmap(
        GITHUB_OWNER,
        GITHUB_REPO,
        GITHUB_TOKEN
    );

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-10 font-sans">
            <h1 className="text-4xl font-semibold text-center mb-14 tracking-tight">
                🚀 <span className="text-white/90">Meu Saldo</span> – Roadmap
            </h1>

            {error && (
                <p className="text-red-500 text-center mb-10">
                    Erro ao carregar dados: {error}
                </p>
            )}

            {loading ? (
                <p className="text-neutral-500 text-center">Carregando roadmap...</p>
            ) : (
                <div className="space-y-10">
                    {milestones.map((milestone) => (
                        <MilestoneCard
                            key={milestone.id}
                            milestone={milestone}
                            issues={issues[milestone.number]}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default EmBreve;
