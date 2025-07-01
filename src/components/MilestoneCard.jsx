import { CheckCircle, Circle } from "phosphor-react";
import ProgressBar from "./ProgressBar.jsx";

function MilestoneCard({ milestone, issues = [] }) {

    const totalIssues = milestone.open_issues + milestone.closed_issues;
    const percent = totalIssues > 0
        ? Math.round((milestone.closed_issues / totalIssues) * 100)
        : 0;

    return (
        <div className="bg-white/5 border border-white/10 shadow-lg backdrop-blur-lg rounded-2xl p-8">
            <div className="mb-4">
                <h2 className="text-xl font-semibold tracking-tight text-white">{milestone.title}</h2>

                {milestone.description && (
                    <p className="text-sm text-neutral-400 mt-1">{milestone.description}</p>
                )}

                <div className="text-xs text-neutral-500 mt-2">
                    🔓 {milestone.open_issues} abertas &nbsp;&nbsp;|&nbsp;&nbsp;
                    🔒 {milestone.closed_issues} fechadas
                </div>

                <ProgressBar percent={percent} />
            </div>

            <ul className="divide-y divide-white/10">
                {issues.length > 0 ? (
                    issues.map((issue) => (
                        <li
                            key={issue.id}
                            className="flex items-center justify-between py-3 text-sm group"
                        >
                            <div className="flex items-center gap-3">
                                <div>
                                    {issue.state === 'closed' ? (
                                        <CheckCircle size={18} weight="fill" className="text-green-500" />
                                    ) : (
                                        <Circle size={18} className="text-neutral-500" />
                                    )}
                                </div>

                                <a
                                    href={issue.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`hover:underline transition-colors duration-300 hover:text-white ${issue.state === 'closed'
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
                    <li className="text-neutral-500 italic py-2">Nenhuma issue disponível.</li>
                )}
            </ul>
        </div>
    );
}

export default MilestoneCard;
