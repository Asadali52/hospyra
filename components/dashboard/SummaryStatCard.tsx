import type { ReactNode } from 'react';

type SummaryStatCardProps = {
  label: string;
  value: string;
  valueClassName?: string;
  footerText?: string;
  footerIcon?: ReactNode;
  footerClassName?: string;
};

const SummaryStatCard = ({
  label,
  value,
  valueClassName,
  footerText,
  footerIcon,
  footerClassName = 'text-[#16A34A]',
}: SummaryStatCardProps) => {
  return (
    <div className="rounded-2xl border bg-linear-to-b from-[#F9F8F8] to-[#F8F2EF] border-[#EEDFDB] p-5">
      <p className="text-sm text-[#27272A] font-effra">{label}</p>
      <p className={`mt-4 text-[26px] font-semibold text-[#0F172A] font-effra ${valueClassName ?? ''}`}>
        {value}
      </p>
      {footerText ? (
        <p className={`mt-2 text-sm font-effra flex items-center gap-1 ${footerClassName}`}>
          {footerIcon}
          {footerText}
        </p>
      ) : null}
    </div>
  );
};

export default SummaryStatCard;
