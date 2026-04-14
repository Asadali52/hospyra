import React from 'react';
import GlobalButton from '@/components/buttons/GlobalButton';
import { hosperraIntelligenceData } from '@/components/dashboard/StaticData';

const HosperraIntelligence = () => {
  return (
    <section className="mt-5 rounded-2xl border border-[#EEDFDB] p-4 md:p-6">
      <h3 className="text-lg font-semibold text-[#2C2D2F] font-effra">
        Hosperra Intelligence
      </h3>

      <div className="mt-5 space-y-3">
        {hosperraIntelligenceData.map((item) => (
          <div
            key={item.text}
            className={`flex items-center gap-3 rounded-xl px-4 py-4 ${item.rowClassName} ${item.borderClassName}`}
          >
            <item.icon size={16} className={`${item.iconClassName} shrink-0`} />
            <p className="text-sm font-medium text-[#2C2D2F] font-effra">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <GlobalButton
          title="View Full Analysis"
          width="100%"
          borderRadius="10px"
          bgColor="#1E50C1"
          color="white"
          font="600"
          className="font-effra"
        />
      </div>
    </section>
  );
};

export default HosperraIntelligence;
