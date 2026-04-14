import { ArrowRight, TrendingUp, AlertCircle } from 'lucide-react';
import { ScoreDonut } from '@/components/dashboard/ScoreDonut';
import { cn } from '@/lib/utils';

const INSIGHTS = [
  {
    tone: 'positive' as const,
    icon: TrendingUp,
    title: 'Food quality improving',
    subtitle: 'Up 7 points this quarter',
    className: 'bg-emerald-50 border-emerald-100',
    iconClass: 'text-emerald-600',
  },
  {
    tone: 'warning' as const,
    icon: AlertCircle,
    title: 'Marketing needs attention',
    subtitle: 'Below 70 - consider new campaigns',
    className: 'bg-amber-50 border-amber-100',
    iconClass: 'text-amber-600',
  },
  {
    tone: 'alert' as const,
    icon: AlertCircle,
    title: 'Cost control opportunity',
    subtitle: 'Could save $2,000/month',
    className: 'bg-orange-50 border-orange-100',
    iconClass: 'text-orange-600',
  },
];

const METRICS = [
  { name: 'Food Quality', score: 82 },
  { name: 'Staffing', score: 70 },
  { name: 'Operations', score: 75 },
  { name: 'Cost Control', score: 68 },
  { name: 'Marketing', score: 65 },
  { name: 'Experience', score: 80 },
] as const;

const PerformancePage = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-8 font-effra">
      <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm ring-1 ring-black/4 md:p-8">
        <div className="flex flex-col gap-10 sm:flex-row">
          <div className="flex flex-col items-center text-center">
            <ScoreDonut score={78} />
            <p className="mt-4 text-base font-semibold text-[#27272A]">Overall Score</p>
            <p className="mt-1 flex items-center justify-center gap-1.5 text-sm font-medium text-emerald-600">
              <TrendingUp className="h-4 w-4" aria-hidden />
              +5 from last month
            </p>
          </div>

          <div className="w-full">
            <h3 className="text-lg font-semibold text-black font-effra">Key Insights</h3>
            <ul className="mt-4 space-y-3">
              {INSIGHTS.map((item) => (
                <li
                  key={item.title}
                  className={cn(
                    'flex gap-3 rounded-xl border px-4 py-3',
                    item.className
                  )}
                >
                  <item.icon className={cn('mt-0.5 h-5 w-5 shrink-0', item.iconClass)} aria-hidden />
                  <div className="min-w-0 text-black">
                    <p className="font-semibold leading-snug">{item.title}</p>
                    <p className="mt-0.5 text-sm opacity-90">{item.subtitle}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {METRICS.map((m) => (
            <li
              key={m.name}
              className="relative flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm ring-1 ring-black/4"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-lg font-semibold text-[#27272A]">{m.name}</p>
                <button
                  type="button"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1E50C1]/10 text-[#1E50C1] transition-colors hover:bg-[#1E50C1]/15"
                  aria-label={`Open ${m.name} details`}
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <p className="text-3xl font-bold tabular-nums text-[#27272A]">{m.score}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default PerformancePage;