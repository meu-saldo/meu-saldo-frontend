export default function ProgressBar({ percent = 0 }) {

    const progressColor =
        percent >= 80
            ? 'bg-green-500'
            : percent >= 50
                ? 'bg-yellow-500'
                : percent >= 30
                ? 'bg-orange-500'
                : 'bg-red-500';

    return (
        <div className="mt-4">
            <div className="h-2 w-full bg-neutral-800 rounded">
                <div
                    className={`h-2 ${progressColor} rounded transition-all duration-300`}
                    style={{ width: `${percent}%` }}
                />
            </div>
            <p className="text-xs text-neutral-400 mt-1">{percent}% concluído</p>
        </div>
    );
}