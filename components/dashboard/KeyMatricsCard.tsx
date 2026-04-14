import React from 'react';
import { TrendingUp } from 'lucide-react';

type KeyMatricsCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  footerText?: string;
  footerTone?: 'positive' | 'neutral';
};

const KeyMatricsCard = ({
  title,
  value,
  icon,
  footerText,
  footerTone = 'neutral',
}: KeyMatricsCardProps) => {
  return (
    <div className="rounded-2xl border border-[#EEDFDB] bg-[#FFDAD0]/10 p-6">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm leading-[1.2] text-[#2C2D2F] font-effra">{title}</p>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
          {icon}
        </div>
      </div>
      <p className="mt-2 text-3xl font-semibold tracking-wide text-[#0F172A] font-effra">{value}</p>
      {footerText ? (
        <p
          className={`mt-6 flex items-center gap-1.5 text-sm font-medium font-effra ${footerTone === 'positive' ? 'text-[#22B46C]' : 'text-[#3F3F46]'
            }`}
        >
          {footerTone === 'positive' ? <TrendingUp size={16} /> : null}
          {footerText}
        </p>
      ) : (
        <div className="mt-6 h-5" />
      )}
    </div>
  );
};

export default KeyMatricsCard;
