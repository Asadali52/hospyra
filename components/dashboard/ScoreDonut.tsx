const R = 72;
const STROKE = 17;
const C = 2 * Math.PI * R;

type ScoreDonutProps = {
  score: number;
  max?: number;
};

export function ScoreDonut({ score, max = 100 }: ScoreDonutProps) {
  const pct = Math.min(Math.max(score / max, 0), 1);
  const dash = C * pct;

  return (
    <div
      className="relative mx-auto flex aspect-square w-44 max-w-full items-center justify-center sm:w-48"
      role="img"
      aria-label={`Overall score ${score} out of ${max}`}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" aria-hidden>
        <defs>
          <linearGradient id="performanceScoreDonutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4945" />
            <stop offset="100%" stopColor="#FF7E5C" />
          </linearGradient>
        </defs>
        <circle
          cx="100"
          cy="100"
          r={R}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={STROKE}
        />
        <circle
          cx="100"
          cy="100"
          r={R}
          fill="none"
          stroke="url(#performanceScoreDonutGrad)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${C}`}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pt-1">
        <p className="text-center font-semibold font-effra leading-none">
          <span className="text-2xl">{score} </span>
          <span className="text-2xl">/ {max}</span>
        </p>
      </div>
    </div>
  );
}
